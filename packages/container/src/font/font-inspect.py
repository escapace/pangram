#!/usr/bin/env python3

import argparse
import hashlib
import json
import logging
import os
from typing import List

from fontTools.ttLib import TTFont
from fontTools.ttLib.tables import otTables
from fontTools.ttLib.tables._n_a_m_e import NameRecord
from fontTools.varLib import instancer
from fontTools.pens.boundsPen import BoundsPen


def hash_dict(d, keys_to_include=None):
    """
    Generates a stable SHA-256 hash for a dictionary or a subset of its keys.

    Args:
        d (dict): The input dictionary.
        keys_to_include (list, optional): List of keys to include in the hash.
            If None, hashes the entire dictionary. Defaults to None.

    Returns:
        str: The hexadecimal digest of the SHA-256 hash.
    """
    # Create a subset of the dictionary if keys are specified
    if keys_to_include is not None:
        # Filter keys present in the dictionary to avoid KeyError
        subset = {k: d[k] for k in keys_to_include if k in d}
    else:
        subset = d  # Use the full dictionary

    # Serialize the subset with sorted keys and no whitespace
    serialized = json.dumps(subset, sort_keys=True, separators=(",", ":"))
    return hashlib.sha1(serialized.encode("utf-8")).hexdigest()[:10]


def sortNamingTable(names: List[NameRecord]) -> List[NameRecord]:
    """
    Sort the naming table based on platform ID and name ID to prioritize English.
    """

    def isEnglish(name: NameRecord) -> bool:
        return (name.platformID, name.langID) in ((1, 0), (3, 0x409))

    PLATFORM_ID_APPLE_UNICODE = 0
    PLATFORM_ID_MACINTOSH = 1
    PLATFORM_ID_ISO = 2
    PLATFORM_ID_MICROSOFT = 3
    PLATFORM_ID_ORDER = [
        PLATFORM_ID_MICROSOFT,
        PLATFORM_ID_APPLE_UNICODE,
        PLATFORM_ID_MACINTOSH,
        PLATFORM_ID_ISO,
    ]

    return sorted(
        names,
        key=lambda name: (
            PLATFORM_ID_ORDER.index(name.platformID),
            name.nameID,
            name.platEncID,
            -isEnglish(name),
            name.langID,
        ),
    )


def getFirstDecodedName(nameID: int, names: List[NameRecord]) -> str | None:
    """
    Retrieve the first decoded name from the font's naming table.
    """
    names = sortNamingTable(names)

    for name in names:
        if name.nameID != nameID:
            continue
        try:
            unistr = name.toUnicode()
        except UnicodeDecodeError:
            continue
        return unistr


# Helper function to get bounding box (TT/Glyf or CFF)
def get_glyph_bounding_box(font, glyph_name):
    """
    Returns (xMin, yMin, xMax, yMax) for a glyph.
    Uses the 'glyf' table if present, otherwise falls back to CFF.
    """
    if "glyf" in font:
        glyph = font["glyf"][glyph_name]

        if not hasattr(glyph, "xMin"):
            glyph.recalcBounds(glyph)

        return (glyph.xMin, glyph.xMax, glyph.yMin, glyph.yMax)
    else:
        glyph_set = font.getGlyphSet()
        glyph = glyph_set[glyph_name]
        pen = BoundsPen(glyph_set)
        glyph.draw(pen)

        return pen.bounds if pen.bounds is not None else (0, 0, 0, 0)
        # # calcBounds returns (xMin, yMin, xMax, yMax)
        # return bounds


def inspect_features(font):
    array = []

    for tag in ("GSUB", "GPOS"):
        if tag not in font:
            continue
        # print("Table:", tag)
        table = font[tag].table
        if not table.ScriptList or not table.FeatureList:
            continue
        featureRecords = table.FeatureList.FeatureRecord
        for script in table.ScriptList.ScriptRecord:
            # print("  Script:", script.ScriptTag)
            if not script.Script:
                # print("    Null script.")
                continue
            languages = list(script.Script.LangSysRecord)
            if script.Script.DefaultLangSys:
                defaultlangsys = otTables.LangSysRecord()
                defaultlangsys.LangSysTag = "default"
                defaultlangsys.LangSys = script.Script.DefaultLangSys
                languages.insert(0, defaultlangsys)
            for langsys in languages:
                # print("    Language:", langsys.LangSysTag)
                if not langsys.LangSys:
                    # print("    Null language.")
                    continue
                features = [
                    featureRecords[index] for index in langsys.LangSys.FeatureIndex
                ]
                if langsys.LangSys.ReqFeatureIndex != 0xFFFF:
                    record = featureRecords[langsys.LangSys.ReqFeatureIndex]
                    requiredfeature = otTables.FeatureRecord()
                    requiredfeature.FeatureTag = "required(%s)" % record.FeatureTag
                    requiredfeature.Feature = record.Feature
                    features.insert(0, requiredfeature)
                for feature in features:
                    # lookups = feature.Feature.LookupListIndex

                    if not any(item["name"] == feature.FeatureTag for item in array):
                        array.append(
                            {
                                "name": feature.FeatureTag,
                                "type": "positioning"
                                if tag == "GPOS"
                                else "substitution",
                            }
                        )

    return array


def inspect(font, options):
    family_name = getFirstDecodedName(16, font["name"].names)
    subfamily_name = getFirstDecodedName(17, font["name"].names)
    full_name = getFirstDecodedName(4, font["name"].names)
    post_script_name = getFirstDecodedName(6, font["name"].names)

    if family_name is None:
        family_name = getFirstDecodedName(1, font["name"].names)

    if subfamily_name is None:
        subfamily_name = getFirstDecodedName(2, font["name"].names)

    typographic_family_name = getFirstDecodedName(1, font["name"].names)
    typographic_subfamily_name = getFirstDecodedName(2, font["name"].names)

    wwsFamilyName = getFirstDecodedName(21, font["name"].names)
    wwsSubFamilyName = getFirstDecodedName(22, font["name"].names)

    # -- Metrics from hhea, OS/2, and head tables --
    hhea_table = font["hhea"]
    os2_table = font["OS/2"]
    head_table = font["head"]

    units_per_em = head_table.unitsPerEm

    # ascent = hhea_table.ascent
    # descent = hhea_table.descent
    # line_gap = hhea_table.lineGap

    typo_ascent = getattr(os2_table, "sTypoAscender", None)
    typo_descent = getattr(os2_table, "sTypoDescender", None)
    typo_line_gap = getattr(os2_table, "sTypoLineGap", None)

    winAscent = getattr(os2_table, "winAscent", None)
    winDescent = getattr(os2_table, "winDescent", None)

    ascent = hhea_table.ascent
    descent = hhea_table.descent
    line_gap = hhea_table.lineGap

    fsselection_bit7_mask = 1 << 7
    # USE_TYPO_METRICS bit
    fsselection_bit7_set = (os2_table.fsSelection & fsselection_bit7_mask) != 0

    osx_line_height = (ascent + descent + line_gap) / units_per_em
    # https://developer.chrome.com/blog/font-fallbacks
    # determine whether a font uses the same font metric overrides on both OSX and Windows devices.
    if fsselection_bit7_set and (
        (typo_ascent is not None)
        and (typo_descent is not None)
        and (typo_line_gap is not None)
    ):
        # If USE_TYPO_METRICS is enabled, the font will be rendered using hhea metrics on OSX
        # devices and typo metrics on Windows devices.
        win_line_height = (typo_ascent + typo_descent + typo_line_gap) / units_per_em

        if not (osx_line_height == win_line_height):
            raise ValueError("Inconsistent font font metric")

        # FIXME: https://www.w3.org/TR/css-inline-3/#ascent-descent
        # It is recommended that implementations that use OpenType or TrueType fonts use the metrics
        # sTypoAscender and sTypoDescender from the font’s OS/2 table (after scaling to the current
        # element’s font size) to find the ascent metric and descent metric for CSS layout. In the absence
        # of these metrics, the "Ascent" and "Descent" metrics from the HHEA table should be used.

        ascent = typo_ascent
        descent = typo_descent
        typo_line_gap = typo_line_gap

    if (not fsselection_bit7_set) and (
        (winAscent is not None) and (winDescent is not None)
    ):
        # If USE_TYPO_METRICS is not enabled, the font will be rendered using hhea metrics on OSX
        # devices and win metrics on Windows devices.
        win_line_height = (winAscent + winDescent) / units_per_em

        if not (line_gap == 0 and osx_line_height == win_line_height):
            raise ValueError("Inconsistent font font metric")

    # OS/2-based metrics may not always be set, so use getattr with None fallback
    cap_height = getattr(os2_table, "sCapHeight", None)
    x_height = getattr(os2_table, "sxHeight", None)
    x_width_avg = getattr(os2_table, "xAvgCharWidth", None)

    cmap = font.getBestCmap()

    if cap_height is None:
        x_min, y_min, x_max, y_max = get_glyph_bounding_box(font, cmap[ord("H")])
        cap_height = y_max

    if x_height is None:
        x_min, y_min, x_max, y_max = get_glyph_bounding_box(font, cmap[ord("x")])
        x_height = y_max

    # -- Collect all properties in a dict --
    font_info = {
        # Metrics
        "ascent": ascent,
        "descent": descent,
        "lineGap": line_gap,
        "capHeight": cap_height,
        "xHeight": x_height,
        "xWidthAvg": x_width_avg,
        "unitsPerEm": units_per_em,
        # Direct Name IDs
        "familyName": family_name,  # ID 1
        "subfamilyName": subfamily_name,  # ID 2
        "fullName": full_name,  # ID 4
        "postScriptName": post_script_name,  # ID 6
        "typographicFamilyName": typographic_family_name,  # ID 16
        "typographicSubfamilyName": typographic_subfamily_name,  # ID 17
        "wwsFamilyName": wwsFamilyName,  # ID 21
        "wwsSubFamilyName": wwsSubFamilyName,  # ID 22
    }

    font_info["features"] = inspect_features(font)

    # --- Build codePoints array ---
    code_points_data = []

    if not options.no_codepoints:
        # Sort by codepoint for a more readable output
        for code_point in sorted(cmap.keys()):
            glyph_name = cmap[code_point]

            # Get advance width from hmtx if available
            # (In most fonts, "hmtx" table is present, but some might differ.)
            if "hmtx" in font:
                advance_width, left_side_bearing = font["hmtx"][glyph_name]
            else:
                advance_width = 0
                left_side_bearing = 0

            # Get bounding box
            x_min, y_min, x_max, y_max = get_glyph_bounding_box(font, glyph_name)

            # Compute the bounding box's width/height
            bbox_width = x_max - x_min
            bbox_height = y_max - y_min

            code_points_data.append(
                {
                    "codePoint": code_point,
                    "advanceWidth": advance_width,
                    "leftSideBearing": left_side_bearing,
                    "xMin": x_min,
                    "yMin": y_min,
                    "xMax": x_max,
                    "yMax": y_max,
                    "width": bbox_width,
                    "height": bbox_height,
                }
            )

    font_info["codePoints"] = code_points_data

    font_info["id"] = createId(font_info)

    return font_info


def createId(font_info):
    return hash_dict(
        font_info,
        [
            "family_name",
            "subfamily_name",
            "full_name",
            "post_script_name",
            "typographic_family_name",
            "typographic_subfamily_name",
            "wwsFamilyName",
            "wwsSubFamilyName",
            "namedInstance",
            "variationSettings",
            "variable",
        ],
    )


def main(args=None):
    logging.getLogger("fontTools.varLib").setLevel("ERROR")

    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )

    parser.add_argument("-f", "--file", required=True)
    parser.add_argument(
        "--no-named-instances",
        default=False,
        action="store_true",
        help="Do not inspect named instances in the font.",
    )

    parser.add_argument(
        "--no-codepoints",
        default=False,
        action="store_true",
        help="Do not inspect codepoints in the font.",
    )

    parser.add_argument(
        "--variation-settings",
        type=lambda s: json.loads(s),
        default=None,
        help="A JSON object to specify low-level OpenType or TrueType font variation settings.",
    )
    # parser.add_argument("-v", "--verbose", action="count", default=0)

    options = parser.parse_args(args)

    if not os.path.isfile(options.file):
        parser.error("No such file")

    font = TTFont(options.file, recalcTimestamp=False)

    font_info = inspect(font, options)

    if "fvar" in font:
        font_info["variable"] = True

        fvar_table = font["fvar"]

        variation_axes = []
        variations = []

        for axis in fvar_table.axes:
            axis_info = {
                # "NameID": axis.axisNameID,   # This is an ID for the axis name in the 'name' table
                "name": axis.axisTag,  # The tag (e.g., 'wght', 'wdth', etc.)
                "min": axis.minValue,  # Minimum value for the axis
                "max": axis.maxValue,  # Maximum value for the axis
                "default": axis.defaultValue,  # Default value for the axis
            }
            variation_axes.append(axis_info)

        if not options.no_named_instances:
            for instance in fvar_table.instances:
                namedInstance = getFirstDecodedName(
                    instance.subfamilyNameID, font["name"].names
                )

                namedInstancePostScriptName = getFirstDecodedName(
                    instance.postscriptNameID, font["name"].names
                )

                coordinates = instance.coordinates

                for axis in fvar_table.axes:
                    if axis.axisTag not in coordinates:
                        coordinates[axis.axisTag] = None

                variation = instancer.instantiateVariableFont(font, coordinates)
                variation_info = inspect(variation, options)

                named_instance_info = {
                    "namedInstance": namedInstance,
                    "namedInstancePostScriptName": namedInstancePostScriptName,
                    "variable": False,
                    "variationSettings": coordinates,
                    **variation_info,
                }

                named_instance_info["id"] = createId(named_instance_info)

                variations.append(named_instance_info)

        if options.variation_settings is not None:
            for coordinates in options.variation_settings:
                for axis in fvar_table.axes:
                    if axis.axisTag not in coordinates:
                        coordinates[axis.axisTag] = None

                variation = instancer.instantiateVariableFont(font, coordinates)
                variation_info = inspect(variation, options)

                named_instance_info = {
                    "variable": False,
                    "variationSettings": coordinates,
                    **variation_info,
                }

                named_instance_info["id"] = createId(named_instance_info)

                variations.append(named_instance_info)

        font_info["variationAxes"] = variation_axes
        font_info["variations"] = variations
    else:
        font_info["variable"] = False
        if options.variation_settings is not None:
            raise ValueError("Not a variable font.")

    # -- Print as JSON --
    print(json.dumps(font_info, indent=2))

    font.close()


if __name__ == "__main__":
    main()
