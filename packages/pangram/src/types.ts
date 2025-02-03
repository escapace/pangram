import type { Properties } from 'csstype'
import type { z } from 'zod'
import type { WebFont } from '@pangram/font-loader'
declare const schemaFontInformationVariation: z.ZodObject<
  z.objectUtil.extendShape<
    {
      namedInstance: z.ZodNullable<z.ZodOptional<z.ZodString>>
      namedInstancePostScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      variable: z.ZodLiteral<false>
    },
    {
      ascent: z.ZodNumber
      capHeight: z.ZodNumber
      codePoints: z.ZodArray<
        z.ZodObject<
          {
            advanceWidth: z.ZodNumber
            codePoint: z.ZodNumber
            height: z.ZodNumber
            leftSideBearing: z.ZodNumber
            width: z.ZodNumber
            xMax: z.ZodNumber
            xMin: z.ZodNumber
            yMax: z.ZodNumber
            yMin: z.ZodNumber
          },
          'strip',
          z.ZodTypeAny,
          {
            advanceWidth: number
            codePoint: number
            height: number
            leftSideBearing: number
            width: number
            xMax: number
            xMin: number
            yMax: number
            yMin: number
          },
          {
            advanceWidth: number
            codePoint: number
            height: number
            leftSideBearing: number
            width: number
            xMax: number
            xMin: number
            yMax: number
            yMin: number
          }
        >
      >
      descent: z.ZodNumber
      familyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      features: z.ZodArray<
        z.ZodObject<
          {
            name: z.ZodString
            type: z.ZodEnum<['substitution', 'positioning']>
          },
          'strip',
          z.ZodTypeAny,
          {
            name: string
            type: 'positioning' | 'substitution'
          },
          {
            name: string
            type: 'positioning' | 'substitution'
          }
        >
      >
      fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      id: z.ZodString
      lineGap: z.ZodNumber
      postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      typographicFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      typographicSubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      unitsPerEm: z.ZodNumber
      wwsFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      wwsSubFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      xHeight: z.ZodNumber
      xWidthAvg: z.ZodNumber
    }
  >,
  'strip',
  z.ZodTypeAny,
  {
    ascent: number
    capHeight: number
    codePoints: Array<{
      advanceWidth: number
      codePoint: number
      height: number
      leftSideBearing: number
      width: number
      xMax: number
      xMin: number
      yMax: number
      yMin: number
    }>
    descent: number
    features: Array<{
      name: string
      type: 'positioning' | 'substitution'
    }>
    id: string
    lineGap: number
    unitsPerEm: number
    variable: false
    xHeight: number
    xWidthAvg: number
    familyName?: string | null | undefined
    fullName?: string | null | undefined
    namedInstance?: string | null | undefined
    namedInstancePostScriptName?: string | null | undefined
    postScriptName?: string | null | undefined
    subfamilyName?: string | null | undefined
    typographicFamilyName?: string | null | undefined
    typographicSubfamilyName?: string | null | undefined
    wwsFamilyName?: string | null | undefined
    wwsSubFamilyName?: string | null | undefined
  },
  {
    ascent: number
    capHeight: number
    codePoints: Array<{
      advanceWidth: number
      codePoint: number
      height: number
      leftSideBearing: number
      width: number
      xMax: number
      xMin: number
      yMax: number
      yMin: number
    }>
    descent: number
    features: Array<{
      name: string
      type: 'positioning' | 'substitution'
    }>
    id: string
    lineGap: number
    unitsPerEm: number
    variable: false
    xHeight: number
    xWidthAvg: number
    familyName?: string | null | undefined
    fullName?: string | null | undefined
    namedInstance?: string | null | undefined
    namedInstancePostScriptName?: string | null | undefined
    postScriptName?: string | null | undefined
    subfamilyName?: string | null | undefined
    typographicFamilyName?: string | null | undefined
    typographicSubfamilyName?: string | null | undefined
    wwsFamilyName?: string | null | undefined
    wwsSubFamilyName?: string | null | undefined
  }
>
export declare const schemaFontInformationStatic: z.ZodObject<
  z.objectUtil.extendShape<
    {
      variable: z.ZodLiteral<true>
      variationAxes: z.ZodArray<
        z.ZodObject<
          {
            default: z.ZodNumber
            max: z.ZodNumber
            min: z.ZodNumber
            name: z.ZodString
          },
          'strip',
          z.ZodTypeAny,
          {
            default: number
            max: number
            min: number
            name: string
          },
          {
            default: number
            max: number
            min: number
            name: string
          }
        >
      >
      variations: z.ZodArray<
        z.ZodObject<
          z.objectUtil.extendShape<
            {
              namedInstance: z.ZodNullable<z.ZodOptional<z.ZodString>>
              namedInstancePostScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
              variable: z.ZodLiteral<false>
            },
            {
              ascent: z.ZodNumber
              capHeight: z.ZodNumber
              codePoints: z.ZodArray<
                z.ZodObject<
                  {
                    advanceWidth: z.ZodNumber
                    codePoint: z.ZodNumber
                    height: z.ZodNumber
                    leftSideBearing: z.ZodNumber
                    width: z.ZodNumber
                    xMax: z.ZodNumber
                    xMin: z.ZodNumber
                    yMax: z.ZodNumber
                    yMin: z.ZodNumber
                  },
                  'strip',
                  z.ZodTypeAny,
                  {
                    advanceWidth: number
                    codePoint: number
                    height: number
                    leftSideBearing: number
                    width: number
                    xMax: number
                    xMin: number
                    yMax: number
                    yMin: number
                  },
                  {
                    advanceWidth: number
                    codePoint: number
                    height: number
                    leftSideBearing: number
                    width: number
                    xMax: number
                    xMin: number
                    yMax: number
                    yMin: number
                  }
                >
              >
              descent: z.ZodNumber
              familyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
              features: z.ZodArray<
                z.ZodObject<
                  {
                    name: z.ZodString
                    type: z.ZodEnum<['substitution', 'positioning']>
                  },
                  'strip',
                  z.ZodTypeAny,
                  {
                    name: string
                    type: 'positioning' | 'substitution'
                  },
                  {
                    name: string
                    type: 'positioning' | 'substitution'
                  }
                >
              >
              fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>
              id: z.ZodString
              lineGap: z.ZodNumber
              postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
              subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
              typographicFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
              typographicSubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
              unitsPerEm: z.ZodNumber
              wwsFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
              wwsSubFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
              xHeight: z.ZodNumber
              xWidthAvg: z.ZodNumber
            }
          >,
          'strip',
          z.ZodTypeAny,
          {
            ascent: number
            capHeight: number
            codePoints: Array<{
              advanceWidth: number
              codePoint: number
              height: number
              leftSideBearing: number
              width: number
              xMax: number
              xMin: number
              yMax: number
              yMin: number
            }>
            descent: number
            features: Array<{
              name: string
              type: 'positioning' | 'substitution'
            }>
            id: string
            lineGap: number
            unitsPerEm: number
            variable: false
            xHeight: number
            xWidthAvg: number
            familyName?: string | null | undefined
            fullName?: string | null | undefined
            namedInstance?: string | null | undefined
            namedInstancePostScriptName?: string | null | undefined
            postScriptName?: string | null | undefined
            subfamilyName?: string | null | undefined
            typographicFamilyName?: string | null | undefined
            typographicSubfamilyName?: string | null | undefined
            wwsFamilyName?: string | null | undefined
            wwsSubFamilyName?: string | null | undefined
          },
          {
            ascent: number
            capHeight: number
            codePoints: Array<{
              advanceWidth: number
              codePoint: number
              height: number
              leftSideBearing: number
              width: number
              xMax: number
              xMin: number
              yMax: number
              yMin: number
            }>
            descent: number
            features: Array<{
              name: string
              type: 'positioning' | 'substitution'
            }>
            id: string
            lineGap: number
            unitsPerEm: number
            variable: false
            xHeight: number
            xWidthAvg: number
            familyName?: string | null | undefined
            fullName?: string | null | undefined
            namedInstance?: string | null | undefined
            namedInstancePostScriptName?: string | null | undefined
            postScriptName?: string | null | undefined
            subfamilyName?: string | null | undefined
            typographicFamilyName?: string | null | undefined
            typographicSubfamilyName?: string | null | undefined
            wwsFamilyName?: string | null | undefined
            wwsSubFamilyName?: string | null | undefined
          }
        >
      >
    },
    {
      ascent: z.ZodNumber
      capHeight: z.ZodNumber
      codePoints: z.ZodArray<
        z.ZodObject<
          {
            advanceWidth: z.ZodNumber
            codePoint: z.ZodNumber
            height: z.ZodNumber
            leftSideBearing: z.ZodNumber
            width: z.ZodNumber
            xMax: z.ZodNumber
            xMin: z.ZodNumber
            yMax: z.ZodNumber
            yMin: z.ZodNumber
          },
          'strip',
          z.ZodTypeAny,
          {
            advanceWidth: number
            codePoint: number
            height: number
            leftSideBearing: number
            width: number
            xMax: number
            xMin: number
            yMax: number
            yMin: number
          },
          {
            advanceWidth: number
            codePoint: number
            height: number
            leftSideBearing: number
            width: number
            xMax: number
            xMin: number
            yMax: number
            yMin: number
          }
        >
      >
      descent: z.ZodNumber
      familyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      features: z.ZodArray<
        z.ZodObject<
          {
            name: z.ZodString
            type: z.ZodEnum<['substitution', 'positioning']>
          },
          'strip',
          z.ZodTypeAny,
          {
            name: string
            type: 'positioning' | 'substitution'
          },
          {
            name: string
            type: 'positioning' | 'substitution'
          }
        >
      >
      fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      id: z.ZodString
      lineGap: z.ZodNumber
      postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      typographicFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      typographicSubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      unitsPerEm: z.ZodNumber
      wwsFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      wwsSubFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      xHeight: z.ZodNumber
      xWidthAvg: z.ZodNumber
    }
  >,
  'strip',
  z.ZodTypeAny,
  {
    ascent: number
    capHeight: number
    codePoints: Array<{
      advanceWidth: number
      codePoint: number
      height: number
      leftSideBearing: number
      width: number
      xMax: number
      xMin: number
      yMax: number
      yMin: number
    }>
    descent: number
    features: Array<{
      name: string
      type: 'positioning' | 'substitution'
    }>
    id: string
    lineGap: number
    unitsPerEm: number
    variable: true
    variationAxes: Array<{
      default: number
      max: number
      min: number
      name: string
    }>
    variations: Array<{
      ascent: number
      capHeight: number
      codePoints: Array<{
        advanceWidth: number
        codePoint: number
        height: number
        leftSideBearing: number
        width: number
        xMax: number
        xMin: number
        yMax: number
        yMin: number
      }>
      descent: number
      features: Array<{
        name: string
        type: 'positioning' | 'substitution'
      }>
      id: string
      lineGap: number
      unitsPerEm: number
      variable: false
      xHeight: number
      xWidthAvg: number
      familyName?: string | null | undefined
      fullName?: string | null | undefined
      namedInstance?: string | null | undefined
      namedInstancePostScriptName?: string | null | undefined
      postScriptName?: string | null | undefined
      subfamilyName?: string | null | undefined
      typographicFamilyName?: string | null | undefined
      typographicSubfamilyName?: string | null | undefined
      wwsFamilyName?: string | null | undefined
      wwsSubFamilyName?: string | null | undefined
    }>
    xHeight: number
    xWidthAvg: number
    familyName?: string | null | undefined
    fullName?: string | null | undefined
    postScriptName?: string | null | undefined
    subfamilyName?: string | null | undefined
    typographicFamilyName?: string | null | undefined
    typographicSubfamilyName?: string | null | undefined
    wwsFamilyName?: string | null | undefined
    wwsSubFamilyName?: string | null | undefined
  },
  {
    ascent: number
    capHeight: number
    codePoints: Array<{
      advanceWidth: number
      codePoint: number
      height: number
      leftSideBearing: number
      width: number
      xMax: number
      xMin: number
      yMax: number
      yMin: number
    }>
    descent: number
    features: Array<{
      name: string
      type: 'positioning' | 'substitution'
    }>
    id: string
    lineGap: number
    unitsPerEm: number
    variable: true
    variationAxes: Array<{
      default: number
      max: number
      min: number
      name: string
    }>
    variations: Array<{
      ascent: number
      capHeight: number
      codePoints: Array<{
        advanceWidth: number
        codePoint: number
        height: number
        leftSideBearing: number
        width: number
        xMax: number
        xMin: number
        yMax: number
        yMin: number
      }>
      descent: number
      features: Array<{
        name: string
        type: 'positioning' | 'substitution'
      }>
      id: string
      lineGap: number
      unitsPerEm: number
      variable: false
      xHeight: number
      xWidthAvg: number
      familyName?: string | null | undefined
      fullName?: string | null | undefined
      namedInstance?: string | null | undefined
      namedInstancePostScriptName?: string | null | undefined
      postScriptName?: string | null | undefined
      subfamilyName?: string | null | undefined
      typographicFamilyName?: string | null | undefined
      typographicSubfamilyName?: string | null | undefined
      wwsFamilyName?: string | null | undefined
      wwsSubFamilyName?: string | null | undefined
    }>
    xHeight: number
    xWidthAvg: number
    familyName?: string | null | undefined
    fullName?: string | null | undefined
    postScriptName?: string | null | undefined
    subfamilyName?: string | null | undefined
    typographicFamilyName?: string | null | undefined
    typographicSubfamilyName?: string | null | undefined
    wwsFamilyName?: string | null | undefined
    wwsSubFamilyName?: string | null | undefined
  }
>
export type FontInformationStatic = z.infer<typeof schemaFontInformationStatic>
export type FontInformationVariation = z.infer<typeof schemaFontInformationVariation>
export declare const schemaFontInformation: z.ZodDiscriminatedUnion<
  'variable',
  [
    z.ZodObject<
      z.objectUtil.extendShape<
        {
          variable: z.ZodLiteral<true>
          variationAxes: z.ZodArray<
            z.ZodObject<
              {
                default: z.ZodNumber
                max: z.ZodNumber
                min: z.ZodNumber
                name: z.ZodString
              },
              'strip',
              z.ZodTypeAny,
              {
                default: number
                max: number
                min: number
                name: string
              },
              {
                default: number
                max: number
                min: number
                name: string
              }
            >
          >
          variations: z.ZodArray<
            z.ZodObject<
              z.objectUtil.extendShape<
                {
                  namedInstance: z.ZodNullable<z.ZodOptional<z.ZodString>>
                  namedInstancePostScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                  variable: z.ZodLiteral<false>
                },
                {
                  ascent: z.ZodNumber
                  capHeight: z.ZodNumber
                  codePoints: z.ZodArray<
                    z.ZodObject<
                      {
                        advanceWidth: z.ZodNumber
                        codePoint: z.ZodNumber
                        height: z.ZodNumber
                        leftSideBearing: z.ZodNumber
                        width: z.ZodNumber
                        xMax: z.ZodNumber
                        xMin: z.ZodNumber
                        yMax: z.ZodNumber
                        yMin: z.ZodNumber
                      },
                      'strip',
                      z.ZodTypeAny,
                      {
                        advanceWidth: number
                        codePoint: number
                        height: number
                        leftSideBearing: number
                        width: number
                        xMax: number
                        xMin: number
                        yMax: number
                        yMin: number
                      },
                      {
                        advanceWidth: number
                        codePoint: number
                        height: number
                        leftSideBearing: number
                        width: number
                        xMax: number
                        xMin: number
                        yMax: number
                        yMin: number
                      }
                    >
                  >
                  descent: z.ZodNumber
                  familyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                  features: z.ZodArray<
                    z.ZodObject<
                      {
                        name: z.ZodString
                        type: z.ZodEnum<['substitution', 'positioning']>
                      },
                      'strip',
                      z.ZodTypeAny,
                      {
                        name: string
                        type: 'positioning' | 'substitution'
                      },
                      {
                        name: string
                        type: 'positioning' | 'substitution'
                      }
                    >
                  >
                  fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                  id: z.ZodString
                  lineGap: z.ZodNumber
                  postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                  subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                  typographicFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                  typographicSubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                  unitsPerEm: z.ZodNumber
                  wwsFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                  wwsSubFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                  xHeight: z.ZodNumber
                  xWidthAvg: z.ZodNumber
                }
              >,
              'strip',
              z.ZodTypeAny,
              {
                ascent: number
                capHeight: number
                codePoints: Array<{
                  advanceWidth: number
                  codePoint: number
                  height: number
                  leftSideBearing: number
                  width: number
                  xMax: number
                  xMin: number
                  yMax: number
                  yMin: number
                }>
                descent: number
                features: Array<{
                  name: string
                  type: 'positioning' | 'substitution'
                }>
                id: string
                lineGap: number
                unitsPerEm: number
                variable: false
                xHeight: number
                xWidthAvg: number
                familyName?: string | null | undefined
                fullName?: string | null | undefined
                namedInstance?: string | null | undefined
                namedInstancePostScriptName?: string | null | undefined
                postScriptName?: string | null | undefined
                subfamilyName?: string | null | undefined
                typographicFamilyName?: string | null | undefined
                typographicSubfamilyName?: string | null | undefined
                wwsFamilyName?: string | null | undefined
                wwsSubFamilyName?: string | null | undefined
              },
              {
                ascent: number
                capHeight: number
                codePoints: Array<{
                  advanceWidth: number
                  codePoint: number
                  height: number
                  leftSideBearing: number
                  width: number
                  xMax: number
                  xMin: number
                  yMax: number
                  yMin: number
                }>
                descent: number
                features: Array<{
                  name: string
                  type: 'positioning' | 'substitution'
                }>
                id: string
                lineGap: number
                unitsPerEm: number
                variable: false
                xHeight: number
                xWidthAvg: number
                familyName?: string | null | undefined
                fullName?: string | null | undefined
                namedInstance?: string | null | undefined
                namedInstancePostScriptName?: string | null | undefined
                postScriptName?: string | null | undefined
                subfamilyName?: string | null | undefined
                typographicFamilyName?: string | null | undefined
                typographicSubfamilyName?: string | null | undefined
                wwsFamilyName?: string | null | undefined
                wwsSubFamilyName?: string | null | undefined
              }
            >
          >
        },
        {
          ascent: z.ZodNumber
          capHeight: z.ZodNumber
          codePoints: z.ZodArray<
            z.ZodObject<
              {
                advanceWidth: z.ZodNumber
                codePoint: z.ZodNumber
                height: z.ZodNumber
                leftSideBearing: z.ZodNumber
                width: z.ZodNumber
                xMax: z.ZodNumber
                xMin: z.ZodNumber
                yMax: z.ZodNumber
                yMin: z.ZodNumber
              },
              'strip',
              z.ZodTypeAny,
              {
                advanceWidth: number
                codePoint: number
                height: number
                leftSideBearing: number
                width: number
                xMax: number
                xMin: number
                yMax: number
                yMin: number
              },
              {
                advanceWidth: number
                codePoint: number
                height: number
                leftSideBearing: number
                width: number
                xMax: number
                xMin: number
                yMax: number
                yMin: number
              }
            >
          >
          descent: z.ZodNumber
          familyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          features: z.ZodArray<
            z.ZodObject<
              {
                name: z.ZodString
                type: z.ZodEnum<['substitution', 'positioning']>
              },
              'strip',
              z.ZodTypeAny,
              {
                name: string
                type: 'positioning' | 'substitution'
              },
              {
                name: string
                type: 'positioning' | 'substitution'
              }
            >
          >
          fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          id: z.ZodString
          lineGap: z.ZodNumber
          postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          typographicFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          typographicSubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          unitsPerEm: z.ZodNumber
          wwsFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          wwsSubFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          xHeight: z.ZodNumber
          xWidthAvg: z.ZodNumber
        }
      >,
      'strip',
      z.ZodTypeAny,
      {
        ascent: number
        capHeight: number
        codePoints: Array<{
          advanceWidth: number
          codePoint: number
          height: number
          leftSideBearing: number
          width: number
          xMax: number
          xMin: number
          yMax: number
          yMin: number
        }>
        descent: number
        features: Array<{
          name: string
          type: 'positioning' | 'substitution'
        }>
        id: string
        lineGap: number
        unitsPerEm: number
        variable: true
        variationAxes: Array<{
          default: number
          max: number
          min: number
          name: string
        }>
        variations: Array<{
          ascent: number
          capHeight: number
          codePoints: Array<{
            advanceWidth: number
            codePoint: number
            height: number
            leftSideBearing: number
            width: number
            xMax: number
            xMin: number
            yMax: number
            yMin: number
          }>
          descent: number
          features: Array<{
            name: string
            type: 'positioning' | 'substitution'
          }>
          id: string
          lineGap: number
          unitsPerEm: number
          variable: false
          xHeight: number
          xWidthAvg: number
          familyName?: string | null | undefined
          fullName?: string | null | undefined
          namedInstance?: string | null | undefined
          namedInstancePostScriptName?: string | null | undefined
          postScriptName?: string | null | undefined
          subfamilyName?: string | null | undefined
          typographicFamilyName?: string | null | undefined
          typographicSubfamilyName?: string | null | undefined
          wwsFamilyName?: string | null | undefined
          wwsSubFamilyName?: string | null | undefined
        }>
        xHeight: number
        xWidthAvg: number
        familyName?: string | null | undefined
        fullName?: string | null | undefined
        postScriptName?: string | null | undefined
        subfamilyName?: string | null | undefined
        typographicFamilyName?: string | null | undefined
        typographicSubfamilyName?: string | null | undefined
        wwsFamilyName?: string | null | undefined
        wwsSubFamilyName?: string | null | undefined
      },
      {
        ascent: number
        capHeight: number
        codePoints: Array<{
          advanceWidth: number
          codePoint: number
          height: number
          leftSideBearing: number
          width: number
          xMax: number
          xMin: number
          yMax: number
          yMin: number
        }>
        descent: number
        features: Array<{
          name: string
          type: 'positioning' | 'substitution'
        }>
        id: string
        lineGap: number
        unitsPerEm: number
        variable: true
        variationAxes: Array<{
          default: number
          max: number
          min: number
          name: string
        }>
        variations: Array<{
          ascent: number
          capHeight: number
          codePoints: Array<{
            advanceWidth: number
            codePoint: number
            height: number
            leftSideBearing: number
            width: number
            xMax: number
            xMin: number
            yMax: number
            yMin: number
          }>
          descent: number
          features: Array<{
            name: string
            type: 'positioning' | 'substitution'
          }>
          id: string
          lineGap: number
          unitsPerEm: number
          variable: false
          xHeight: number
          xWidthAvg: number
          familyName?: string | null | undefined
          fullName?: string | null | undefined
          namedInstance?: string | null | undefined
          namedInstancePostScriptName?: string | null | undefined
          postScriptName?: string | null | undefined
          subfamilyName?: string | null | undefined
          typographicFamilyName?: string | null | undefined
          typographicSubfamilyName?: string | null | undefined
          wwsFamilyName?: string | null | undefined
          wwsSubFamilyName?: string | null | undefined
        }>
        xHeight: number
        xWidthAvg: number
        familyName?: string | null | undefined
        fullName?: string | null | undefined
        postScriptName?: string | null | undefined
        subfamilyName?: string | null | undefined
        typographicFamilyName?: string | null | undefined
        typographicSubfamilyName?: string | null | undefined
        wwsFamilyName?: string | null | undefined
        wwsSubFamilyName?: string | null | undefined
      }
    >,
    z.ZodObject<
      z.objectUtil.extendShape<
        {
          namedInstance: z.ZodNullable<z.ZodOptional<z.ZodString>>
          namedInstancePostScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          variable: z.ZodLiteral<false>
        },
        {
          ascent: z.ZodNumber
          capHeight: z.ZodNumber
          codePoints: z.ZodArray<
            z.ZodObject<
              {
                advanceWidth: z.ZodNumber
                codePoint: z.ZodNumber
                height: z.ZodNumber
                leftSideBearing: z.ZodNumber
                width: z.ZodNumber
                xMax: z.ZodNumber
                xMin: z.ZodNumber
                yMax: z.ZodNumber
                yMin: z.ZodNumber
              },
              'strip',
              z.ZodTypeAny,
              {
                advanceWidth: number
                codePoint: number
                height: number
                leftSideBearing: number
                width: number
                xMax: number
                xMin: number
                yMax: number
                yMin: number
              },
              {
                advanceWidth: number
                codePoint: number
                height: number
                leftSideBearing: number
                width: number
                xMax: number
                xMin: number
                yMax: number
                yMin: number
              }
            >
          >
          descent: z.ZodNumber
          familyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          features: z.ZodArray<
            z.ZodObject<
              {
                name: z.ZodString
                type: z.ZodEnum<['substitution', 'positioning']>
              },
              'strip',
              z.ZodTypeAny,
              {
                name: string
                type: 'positioning' | 'substitution'
              },
              {
                name: string
                type: 'positioning' | 'substitution'
              }
            >
          >
          fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          id: z.ZodString
          lineGap: z.ZodNumber
          postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          typographicFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          typographicSubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          unitsPerEm: z.ZodNumber
          wwsFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          wwsSubFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          xHeight: z.ZodNumber
          xWidthAvg: z.ZodNumber
        }
      >,
      'strip',
      z.ZodTypeAny,
      {
        ascent: number
        capHeight: number
        codePoints: Array<{
          advanceWidth: number
          codePoint: number
          height: number
          leftSideBearing: number
          width: number
          xMax: number
          xMin: number
          yMax: number
          yMin: number
        }>
        descent: number
        features: Array<{
          name: string
          type: 'positioning' | 'substitution'
        }>
        id: string
        lineGap: number
        unitsPerEm: number
        variable: false
        xHeight: number
        xWidthAvg: number
        familyName?: string | null | undefined
        fullName?: string | null | undefined
        namedInstance?: string | null | undefined
        namedInstancePostScriptName?: string | null | undefined
        postScriptName?: string | null | undefined
        subfamilyName?: string | null | undefined
        typographicFamilyName?: string | null | undefined
        typographicSubfamilyName?: string | null | undefined
        wwsFamilyName?: string | null | undefined
        wwsSubFamilyName?: string | null | undefined
      },
      {
        ascent: number
        capHeight: number
        codePoints: Array<{
          advanceWidth: number
          codePoint: number
          height: number
          leftSideBearing: number
          width: number
          xMax: number
          xMin: number
          yMax: number
          yMin: number
        }>
        descent: number
        features: Array<{
          name: string
          type: 'positioning' | 'substitution'
        }>
        id: string
        lineGap: number
        unitsPerEm: number
        variable: false
        xHeight: number
        xWidthAvg: number
        familyName?: string | null | undefined
        fullName?: string | null | undefined
        namedInstance?: string | null | undefined
        namedInstancePostScriptName?: string | null | undefined
        postScriptName?: string | null | undefined
        subfamilyName?: string | null | undefined
        typographicFamilyName?: string | null | undefined
        typographicSubfamilyName?: string | null | undefined
        wwsFamilyName?: string | null | undefined
        wwsSubFamilyName?: string | null | undefined
      }
    >,
  ]
>
export type FontInformation = z.infer<typeof schemaFontInformation>
export type InferFont = {
  prefer?: InferFont[]
} & z.infer<typeof schemaFontPlaceholder>
export type InferLocale = Record<string, InferRule>
export type InferLocales = Record<string, string | InferLocale>
export type InferRule = z.infer<typeof schemaRule>
export type InputFont = {
  prefer?: InputFont[]
} & z.input<typeof schemaFontPlaceholder>
export type InputLocale = Record<string, InputRule>
export type InputLocales = Record<string, string | InputLocale>
export type InputRule = z.input<typeof schemaRule>
export declare const schemaFontPlaceholder: z.ZodObject<
  {
    display: z.ZodOptional<
      z.ZodUnion<
        [
          z.ZodUnion<
            [
              z.ZodUnion<
                [z.ZodUnion<[z.ZodLiteral<'auto'>, z.ZodLiteral<'block'>]>, z.ZodLiteral<'swap'>]
              >,
              z.ZodLiteral<'fallback'>,
            ]
          >,
          z.ZodLiteral<'optional'>,
        ]
      >
    >
    format: z.ZodEffects<
      z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<'woff'>, z.ZodLiteral<'woff2'>]>>>,
      Array<'woff' | 'woff2'>,
      Array<'woff' | 'woff2'> | undefined
    >
    name: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>
    resourceHint: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<'preload'>, z.ZodLiteral<'prefetch'>]>>
    source: z.ZodString
    tech: z.ZodOptional<z.ZodArray<z.ZodEnum<['variations']>>>
    unicodeRange: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>
  },
  'strip',
  z.ZodTypeAny,
  {
    format: Array<'woff' | 'woff2'>
    source: string
    display?: 'auto' | 'block' | 'fallback' | 'optional' | 'swap' | undefined
    name?: string | undefined
    resourceHint?: 'prefetch' | 'preload' | undefined
    tech?: Array<'variations'> | undefined
    unicodeRange?: string | undefined
  },
  {
    source: string
    display?: 'auto' | 'block' | 'fallback' | 'optional' | 'swap' | undefined
    format?: Array<'woff' | 'woff2'> | undefined
    name?: string | undefined
    resourceHint?: 'prefetch' | 'preload' | undefined
    tech?: Array<'variations'> | undefined
    unicodeRange?: string | undefined
  }
>
export declare const schemaFontVariationSettings: z.ZodUnion<
  [z.ZodLiteral<'normal'>, z.ZodRecord<z.ZodString, z.ZodNumber>]
>
export declare const schemaFontWeight: z.ZodDefault<z.ZodNumber>
export declare const schemaFontStretch: z.ZodDefault<z.ZodNumber>
export declare const schemaFontStyle: z.ZodDefault<z.ZodEnum<['normal', 'italic']>>
export declare const schemaFontProperties: z.ZodObject<
  {
    fontFamily: z.ZodOptional<
      z.ZodEffects<
        z.ZodArray<
          z.ZodUnion<
            [
              z.ZodType<InferFont, z.ZodTypeDef, InputFont>,
              z.ZodDiscriminatedUnion<
                'variable',
                [
                  z.ZodObject<
                    z.objectUtil.extendShape<
                      {
                        variable: z.ZodLiteral<true>
                        variationAxes: z.ZodArray<
                          z.ZodObject<
                            {
                              default: z.ZodNumber
                              max: z.ZodNumber
                              min: z.ZodNumber
                              name: z.ZodString
                            },
                            'strip',
                            z.ZodTypeAny,
                            {
                              default: number
                              max: number
                              min: number
                              name: string
                            },
                            {
                              default: number
                              max: number
                              min: number
                              name: string
                            }
                          >
                        >
                        variations: z.ZodArray<
                          z.ZodObject<
                            z.objectUtil.extendShape<
                              {
                                namedInstance: z.ZodNullable<z.ZodOptional<z.ZodString>>
                                namedInstancePostScriptName: z.ZodNullable<
                                  z.ZodOptional<z.ZodString>
                                >
                                variable: z.ZodLiteral<false>
                              },
                              {
                                ascent: z.ZodNumber
                                capHeight: z.ZodNumber
                                codePoints: z.ZodArray<
                                  z.ZodObject<
                                    {
                                      advanceWidth: z.ZodNumber
                                      codePoint: z.ZodNumber
                                      height: z.ZodNumber
                                      leftSideBearing: z.ZodNumber
                                      width: z.ZodNumber
                                      xMax: z.ZodNumber
                                      xMin: z.ZodNumber
                                      yMax: z.ZodNumber
                                      yMin: z.ZodNumber
                                    },
                                    'strip',
                                    z.ZodTypeAny,
                                    {
                                      advanceWidth: number
                                      codePoint: number
                                      height: number
                                      leftSideBearing: number
                                      width: number
                                      xMax: number
                                      xMin: number
                                      yMax: number
                                      yMin: number
                                    },
                                    {
                                      advanceWidth: number
                                      codePoint: number
                                      height: number
                                      leftSideBearing: number
                                      width: number
                                      xMax: number
                                      xMin: number
                                      yMax: number
                                      yMin: number
                                    }
                                  >
                                >
                                descent: z.ZodNumber
                                familyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                                features: z.ZodArray<
                                  z.ZodObject<
                                    {
                                      name: z.ZodString
                                      type: z.ZodEnum<['substitution', 'positioning']>
                                    },
                                    'strip',
                                    z.ZodTypeAny,
                                    {
                                      name: string
                                      type: 'positioning' | 'substitution'
                                    },
                                    {
                                      name: string
                                      type: 'positioning' | 'substitution'
                                    }
                                  >
                                >
                                fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                                id: z.ZodString
                                lineGap: z.ZodNumber
                                postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                                subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                                typographicFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                                typographicSubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                                unitsPerEm: z.ZodNumber
                                wwsFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                                wwsSubFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                                xHeight: z.ZodNumber
                                xWidthAvg: z.ZodNumber
                              }
                            >,
                            'strip',
                            z.ZodTypeAny,
                            {
                              ascent: number
                              capHeight: number
                              codePoints: Array<{
                                advanceWidth: number
                                codePoint: number
                                height: number
                                leftSideBearing: number
                                width: number
                                xMax: number
                                xMin: number
                                yMax: number
                                yMin: number
                              }>
                              descent: number
                              features: Array<{
                                name: string
                                type: 'positioning' | 'substitution'
                              }>
                              id: string
                              lineGap: number
                              unitsPerEm: number
                              variable: false
                              xHeight: number
                              xWidthAvg: number
                              familyName?: string | null | undefined
                              fullName?: string | null | undefined
                              namedInstance?: string | null | undefined
                              namedInstancePostScriptName?: string | null | undefined
                              postScriptName?: string | null | undefined
                              subfamilyName?: string | null | undefined
                              typographicFamilyName?: string | null | undefined
                              typographicSubfamilyName?: string | null | undefined
                              wwsFamilyName?: string | null | undefined
                              wwsSubFamilyName?: string | null | undefined
                            },
                            {
                              ascent: number
                              capHeight: number
                              codePoints: Array<{
                                advanceWidth: number
                                codePoint: number
                                height: number
                                leftSideBearing: number
                                width: number
                                xMax: number
                                xMin: number
                                yMax: number
                                yMin: number
                              }>
                              descent: number
                              features: Array<{
                                name: string
                                type: 'positioning' | 'substitution'
                              }>
                              id: string
                              lineGap: number
                              unitsPerEm: number
                              variable: false
                              xHeight: number
                              xWidthAvg: number
                              familyName?: string | null | undefined
                              fullName?: string | null | undefined
                              namedInstance?: string | null | undefined
                              namedInstancePostScriptName?: string | null | undefined
                              postScriptName?: string | null | undefined
                              subfamilyName?: string | null | undefined
                              typographicFamilyName?: string | null | undefined
                              typographicSubfamilyName?: string | null | undefined
                              wwsFamilyName?: string | null | undefined
                              wwsSubFamilyName?: string | null | undefined
                            }
                          >
                        >
                      },
                      {
                        ascent: z.ZodNumber
                        capHeight: z.ZodNumber
                        codePoints: z.ZodArray<
                          z.ZodObject<
                            {
                              advanceWidth: z.ZodNumber
                              codePoint: z.ZodNumber
                              height: z.ZodNumber
                              leftSideBearing: z.ZodNumber
                              width: z.ZodNumber
                              xMax: z.ZodNumber
                              xMin: z.ZodNumber
                              yMax: z.ZodNumber
                              yMin: z.ZodNumber
                            },
                            'strip',
                            z.ZodTypeAny,
                            {
                              advanceWidth: number
                              codePoint: number
                              height: number
                              leftSideBearing: number
                              width: number
                              xMax: number
                              xMin: number
                              yMax: number
                              yMin: number
                            },
                            {
                              advanceWidth: number
                              codePoint: number
                              height: number
                              leftSideBearing: number
                              width: number
                              xMax: number
                              xMin: number
                              yMax: number
                              yMin: number
                            }
                          >
                        >
                        descent: z.ZodNumber
                        familyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        features: z.ZodArray<
                          z.ZodObject<
                            {
                              name: z.ZodString
                              type: z.ZodEnum<['substitution', 'positioning']>
                            },
                            'strip',
                            z.ZodTypeAny,
                            {
                              name: string
                              type: 'positioning' | 'substitution'
                            },
                            {
                              name: string
                              type: 'positioning' | 'substitution'
                            }
                          >
                        >
                        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        id: z.ZodString
                        lineGap: z.ZodNumber
                        postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        typographicFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        typographicSubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        unitsPerEm: z.ZodNumber
                        wwsFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        wwsSubFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        xHeight: z.ZodNumber
                        xWidthAvg: z.ZodNumber
                      }
                    >,
                    'strip',
                    z.ZodTypeAny,
                    {
                      ascent: number
                      capHeight: number
                      codePoints: Array<{
                        advanceWidth: number
                        codePoint: number
                        height: number
                        leftSideBearing: number
                        width: number
                        xMax: number
                        xMin: number
                        yMax: number
                        yMin: number
                      }>
                      descent: number
                      features: Array<{
                        name: string
                        type: 'positioning' | 'substitution'
                      }>
                      id: string
                      lineGap: number
                      unitsPerEm: number
                      variable: true
                      variationAxes: Array<{
                        default: number
                        max: number
                        min: number
                        name: string
                      }>
                      variations: Array<{
                        ascent: number
                        capHeight: number
                        codePoints: Array<{
                          advanceWidth: number
                          codePoint: number
                          height: number
                          leftSideBearing: number
                          width: number
                          xMax: number
                          xMin: number
                          yMax: number
                          yMin: number
                        }>
                        descent: number
                        features: Array<{
                          name: string
                          type: 'positioning' | 'substitution'
                        }>
                        id: string
                        lineGap: number
                        unitsPerEm: number
                        variable: false
                        xHeight: number
                        xWidthAvg: number
                        familyName?: string | null | undefined
                        fullName?: string | null | undefined
                        namedInstance?: string | null | undefined
                        namedInstancePostScriptName?: string | null | undefined
                        postScriptName?: string | null | undefined
                        subfamilyName?: string | null | undefined
                        typographicFamilyName?: string | null | undefined
                        typographicSubfamilyName?: string | null | undefined
                        wwsFamilyName?: string | null | undefined
                        wwsSubFamilyName?: string | null | undefined
                      }>
                      xHeight: number
                      xWidthAvg: number
                      familyName?: string | null | undefined
                      fullName?: string | null | undefined
                      postScriptName?: string | null | undefined
                      subfamilyName?: string | null | undefined
                      typographicFamilyName?: string | null | undefined
                      typographicSubfamilyName?: string | null | undefined
                      wwsFamilyName?: string | null | undefined
                      wwsSubFamilyName?: string | null | undefined
                    },
                    {
                      ascent: number
                      capHeight: number
                      codePoints: Array<{
                        advanceWidth: number
                        codePoint: number
                        height: number
                        leftSideBearing: number
                        width: number
                        xMax: number
                        xMin: number
                        yMax: number
                        yMin: number
                      }>
                      descent: number
                      features: Array<{
                        name: string
                        type: 'positioning' | 'substitution'
                      }>
                      id: string
                      lineGap: number
                      unitsPerEm: number
                      variable: true
                      variationAxes: Array<{
                        default: number
                        max: number
                        min: number
                        name: string
                      }>
                      variations: Array<{
                        ascent: number
                        capHeight: number
                        codePoints: Array<{
                          advanceWidth: number
                          codePoint: number
                          height: number
                          leftSideBearing: number
                          width: number
                          xMax: number
                          xMin: number
                          yMax: number
                          yMin: number
                        }>
                        descent: number
                        features: Array<{
                          name: string
                          type: 'positioning' | 'substitution'
                        }>
                        id: string
                        lineGap: number
                        unitsPerEm: number
                        variable: false
                        xHeight: number
                        xWidthAvg: number
                        familyName?: string | null | undefined
                        fullName?: string | null | undefined
                        namedInstance?: string | null | undefined
                        namedInstancePostScriptName?: string | null | undefined
                        postScriptName?: string | null | undefined
                        subfamilyName?: string | null | undefined
                        typographicFamilyName?: string | null | undefined
                        typographicSubfamilyName?: string | null | undefined
                        wwsFamilyName?: string | null | undefined
                        wwsSubFamilyName?: string | null | undefined
                      }>
                      xHeight: number
                      xWidthAvg: number
                      familyName?: string | null | undefined
                      fullName?: string | null | undefined
                      postScriptName?: string | null | undefined
                      subfamilyName?: string | null | undefined
                      typographicFamilyName?: string | null | undefined
                      typographicSubfamilyName?: string | null | undefined
                      wwsFamilyName?: string | null | undefined
                      wwsSubFamilyName?: string | null | undefined
                    }
                  >,
                  z.ZodObject<
                    z.objectUtil.extendShape<
                      {
                        namedInstance: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        namedInstancePostScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        variable: z.ZodLiteral<false>
                      },
                      {
                        ascent: z.ZodNumber
                        capHeight: z.ZodNumber
                        codePoints: z.ZodArray<
                          z.ZodObject<
                            {
                              advanceWidth: z.ZodNumber
                              codePoint: z.ZodNumber
                              height: z.ZodNumber
                              leftSideBearing: z.ZodNumber
                              width: z.ZodNumber
                              xMax: z.ZodNumber
                              xMin: z.ZodNumber
                              yMax: z.ZodNumber
                              yMin: z.ZodNumber
                            },
                            'strip',
                            z.ZodTypeAny,
                            {
                              advanceWidth: number
                              codePoint: number
                              height: number
                              leftSideBearing: number
                              width: number
                              xMax: number
                              xMin: number
                              yMax: number
                              yMin: number
                            },
                            {
                              advanceWidth: number
                              codePoint: number
                              height: number
                              leftSideBearing: number
                              width: number
                              xMax: number
                              xMin: number
                              yMax: number
                              yMin: number
                            }
                          >
                        >
                        descent: z.ZodNumber
                        familyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        features: z.ZodArray<
                          z.ZodObject<
                            {
                              name: z.ZodString
                              type: z.ZodEnum<['substitution', 'positioning']>
                            },
                            'strip',
                            z.ZodTypeAny,
                            {
                              name: string
                              type: 'positioning' | 'substitution'
                            },
                            {
                              name: string
                              type: 'positioning' | 'substitution'
                            }
                          >
                        >
                        fullName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        id: z.ZodString
                        lineGap: z.ZodNumber
                        postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        typographicFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        typographicSubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        unitsPerEm: z.ZodNumber
                        wwsFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        wwsSubFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                        xHeight: z.ZodNumber
                        xWidthAvg: z.ZodNumber
                      }
                    >,
                    'strip',
                    z.ZodTypeAny,
                    {
                      ascent: number
                      capHeight: number
                      codePoints: Array<{
                        advanceWidth: number
                        codePoint: number
                        height: number
                        leftSideBearing: number
                        width: number
                        xMax: number
                        xMin: number
                        yMax: number
                        yMin: number
                      }>
                      descent: number
                      features: Array<{
                        name: string
                        type: 'positioning' | 'substitution'
                      }>
                      id: string
                      lineGap: number
                      unitsPerEm: number
                      variable: false
                      xHeight: number
                      xWidthAvg: number
                      familyName?: string | null | undefined
                      fullName?: string | null | undefined
                      namedInstance?: string | null | undefined
                      namedInstancePostScriptName?: string | null | undefined
                      postScriptName?: string | null | undefined
                      subfamilyName?: string | null | undefined
                      typographicFamilyName?: string | null | undefined
                      typographicSubfamilyName?: string | null | undefined
                      wwsFamilyName?: string | null | undefined
                      wwsSubFamilyName?: string | null | undefined
                    },
                    {
                      ascent: number
                      capHeight: number
                      codePoints: Array<{
                        advanceWidth: number
                        codePoint: number
                        height: number
                        leftSideBearing: number
                        width: number
                        xMax: number
                        xMin: number
                        yMax: number
                        yMin: number
                      }>
                      descent: number
                      features: Array<{
                        name: string
                        type: 'positioning' | 'substitution'
                      }>
                      id: string
                      lineGap: number
                      unitsPerEm: number
                      variable: false
                      xHeight: number
                      xWidthAvg: number
                      familyName?: string | null | undefined
                      fullName?: string | null | undefined
                      namedInstance?: string | null | undefined
                      namedInstancePostScriptName?: string | null | undefined
                      postScriptName?: string | null | undefined
                      subfamilyName?: string | null | undefined
                      typographicFamilyName?: string | null | undefined
                      typographicSubfamilyName?: string | null | undefined
                      wwsFamilyName?: string | null | undefined
                      wwsSubFamilyName?: string | null | undefined
                    }
                  >,
                ]
              >,
            ]
          >
        >,
        {
          fallbacks: FontInformation[]
          fonts: InferFont[]
        },
        Array<
          | InputFont
          | {
              ascent: number
              capHeight: number
              codePoints: Array<{
                advanceWidth: number
                codePoint: number
                height: number
                leftSideBearing: number
                width: number
                xMax: number
                xMin: number
                yMax: number
                yMin: number
              }>
              descent: number
              features: Array<{
                name: string
                type: 'positioning' | 'substitution'
              }>
              id: string
              lineGap: number
              unitsPerEm: number
              variable: false
              xHeight: number
              xWidthAvg: number
              familyName?: string | null | undefined
              fullName?: string | null | undefined
              namedInstance?: string | null | undefined
              namedInstancePostScriptName?: string | null | undefined
              postScriptName?: string | null | undefined
              subfamilyName?: string | null | undefined
              typographicFamilyName?: string | null | undefined
              typographicSubfamilyName?: string | null | undefined
              wwsFamilyName?: string | null | undefined
              wwsSubFamilyName?: string | null | undefined
            }
          | {
              ascent: number
              capHeight: number
              codePoints: Array<{
                advanceWidth: number
                codePoint: number
                height: number
                leftSideBearing: number
                width: number
                xMax: number
                xMin: number
                yMax: number
                yMin: number
              }>
              descent: number
              features: Array<{
                name: string
                type: 'positioning' | 'substitution'
              }>
              id: string
              lineGap: number
              unitsPerEm: number
              variable: true
              variationAxes: Array<{
                default: number
                max: number
                min: number
                name: string
              }>
              variations: Array<{
                ascent: number
                capHeight: number
                codePoints: Array<{
                  advanceWidth: number
                  codePoint: number
                  height: number
                  leftSideBearing: number
                  width: number
                  xMax: number
                  xMin: number
                  yMax: number
                  yMin: number
                }>
                descent: number
                features: Array<{
                  name: string
                  type: 'positioning' | 'substitution'
                }>
                id: string
                lineGap: number
                unitsPerEm: number
                variable: false
                xHeight: number
                xWidthAvg: number
                familyName?: string | null | undefined
                fullName?: string | null | undefined
                namedInstance?: string | null | undefined
                namedInstancePostScriptName?: string | null | undefined
                postScriptName?: string | null | undefined
                subfamilyName?: string | null | undefined
                typographicFamilyName?: string | null | undefined
                typographicSubfamilyName?: string | null | undefined
                wwsFamilyName?: string | null | undefined
                wwsSubFamilyName?: string | null | undefined
              }>
              xHeight: number
              xWidthAvg: number
              familyName?: string | null | undefined
              fullName?: string | null | undefined
              postScriptName?: string | null | undefined
              subfamilyName?: string | null | undefined
              typographicFamilyName?: string | null | undefined
              typographicSubfamilyName?: string | null | undefined
              wwsFamilyName?: string | null | undefined
              wwsSubFamilyName?: string | null | undefined
            }
        >
      >
    >
    fontStretch: z.ZodOptional<z.ZodDefault<z.ZodNumber>>
    fontStyle: z.ZodOptional<z.ZodDefault<z.ZodEnum<['normal', 'italic']>>>
    fontVariationSettings: z.ZodOptional<
      z.ZodUnion<[z.ZodLiteral<'normal'>, z.ZodRecord<z.ZodString, z.ZodNumber>]>
    >
    fontWeight: z.ZodOptional<z.ZodDefault<z.ZodNumber>>
  },
  'strip',
  z.ZodTypeAny,
  {
    fontFamily?:
      | {
          fallbacks: FontInformation[]
          fonts: InferFont[]
        }
      | undefined
    fontStretch?: number | undefined
    fontStyle?: 'italic' | 'normal' | undefined
    fontVariationSettings?: 'normal' | Record<string, number> | undefined
    fontWeight?: number | undefined
  },
  {
    fontFamily?:
      | Array<
          | InputFont
          | {
              ascent: number
              capHeight: number
              codePoints: Array<{
                advanceWidth: number
                codePoint: number
                height: number
                leftSideBearing: number
                width: number
                xMax: number
                xMin: number
                yMax: number
                yMin: number
              }>
              descent: number
              features: Array<{
                name: string
                type: 'positioning' | 'substitution'
              }>
              id: string
              lineGap: number
              unitsPerEm: number
              variable: false
              xHeight: number
              xWidthAvg: number
              familyName?: string | null | undefined
              fullName?: string | null | undefined
              namedInstance?: string | null | undefined
              namedInstancePostScriptName?: string | null | undefined
              postScriptName?: string | null | undefined
              subfamilyName?: string | null | undefined
              typographicFamilyName?: string | null | undefined
              typographicSubfamilyName?: string | null | undefined
              wwsFamilyName?: string | null | undefined
              wwsSubFamilyName?: string | null | undefined
            }
          | {
              ascent: number
              capHeight: number
              codePoints: Array<{
                advanceWidth: number
                codePoint: number
                height: number
                leftSideBearing: number
                width: number
                xMax: number
                xMin: number
                yMax: number
                yMin: number
              }>
              descent: number
              features: Array<{
                name: string
                type: 'positioning' | 'substitution'
              }>
              id: string
              lineGap: number
              unitsPerEm: number
              variable: true
              variationAxes: Array<{
                default: number
                max: number
                min: number
                name: string
              }>
              variations: Array<{
                ascent: number
                capHeight: number
                codePoints: Array<{
                  advanceWidth: number
                  codePoint: number
                  height: number
                  leftSideBearing: number
                  width: number
                  xMax: number
                  xMin: number
                  yMax: number
                  yMin: number
                }>
                descent: number
                features: Array<{
                  name: string
                  type: 'positioning' | 'substitution'
                }>
                id: string
                lineGap: number
                unitsPerEm: number
                variable: false
                xHeight: number
                xWidthAvg: number
                familyName?: string | null | undefined
                fullName?: string | null | undefined
                namedInstance?: string | null | undefined
                namedInstancePostScriptName?: string | null | undefined
                postScriptName?: string | null | undefined
                subfamilyName?: string | null | undefined
                typographicFamilyName?: string | null | undefined
                typographicSubfamilyName?: string | null | undefined
                wwsFamilyName?: string | null | undefined
                wwsSubFamilyName?: string | null | undefined
              }>
              xHeight: number
              xWidthAvg: number
              familyName?: string | null | undefined
              fullName?: string | null | undefined
              postScriptName?: string | null | undefined
              subfamilyName?: string | null | undefined
              typographicFamilyName?: string | null | undefined
              typographicSubfamilyName?: string | null | undefined
              wwsFamilyName?: string | null | undefined
              wwsSubFamilyName?: string | null | undefined
            }
        >
      | undefined
    fontStretch?: number | undefined
    fontStyle?: 'italic' | 'normal' | undefined
    fontVariationSettings?: 'normal' | Record<string, number> | undefined
    fontWeight?: number | undefined
  }
>
export type CSSProperties<T extends {}> = {
  [Property in Exclude<keyof CSSTypeProperties, keyof T>]?:
    | Array<CSSTypeProperties[Property]>
    | CSSTypeProperties[Property]
} & T
export type CSSTypeProperties = Properties<({} & string) | number>
export interface FeatureQueries<StyleType> {
  '@supports'?: Record<string, StyleType>
}
export type InferFontProperties = z.infer<typeof schemaFontProperties>
export type InputFontProperties = z.input<typeof schemaFontProperties>
export interface MediaQueries<StyleType> {
  '@media'?: Record<string, StyleType>
}
export type StyleRule<T extends {}> = CSSProperties<T> &
  FeatureQueries<CSSProperties<T> & MediaQueries<CSSProperties<T>>> &
  MediaQueries<CSSProperties<T> & FeatureQueries<CSSProperties<T>>>
declare const schemaRule: z.ZodType<
  StyleRule<InferFontProperties>,
  z.ZodTypeDef,
  StyleRule<InputFontProperties>
>
export declare const schemaLocale: z.ZodObject<
  {},
  'strip',
  z.ZodType<
    StyleRule<{
      fontFamily?:
        | {
            fallbacks: FontInformation[]
            fonts: InferFont[]
          }
        | undefined
      fontStretch?: number | undefined
      fontStyle?: 'italic' | 'normal' | undefined
      fontVariationSettings?: 'normal' | Record<string, number> | undefined
      fontWeight?: number | undefined
    }>,
    z.ZodTypeDef,
    StyleRule<{
      fontFamily?:
        | Array<
            | InputFont
            | {
                ascent: number
                capHeight: number
                codePoints: Array<{
                  advanceWidth: number
                  codePoint: number
                  height: number
                  leftSideBearing: number
                  width: number
                  xMax: number
                  xMin: number
                  yMax: number
                  yMin: number
                }>
                descent: number
                features: Array<{
                  name: string
                  type: 'positioning' | 'substitution'
                }>
                id: string
                lineGap: number
                unitsPerEm: number
                variable: false
                xHeight: number
                xWidthAvg: number
                familyName?: string | null | undefined
                fullName?: string | null | undefined
                namedInstance?: string | null | undefined
                namedInstancePostScriptName?: string | null | undefined
                postScriptName?: string | null | undefined
                subfamilyName?: string | null | undefined
                typographicFamilyName?: string | null | undefined
                typographicSubfamilyName?: string | null | undefined
                wwsFamilyName?: string | null | undefined
                wwsSubFamilyName?: string | null | undefined
              }
            | {
                ascent: number
                capHeight: number
                codePoints: Array<{
                  advanceWidth: number
                  codePoint: number
                  height: number
                  leftSideBearing: number
                  width: number
                  xMax: number
                  xMin: number
                  yMax: number
                  yMin: number
                }>
                descent: number
                features: Array<{
                  name: string
                  type: 'positioning' | 'substitution'
                }>
                id: string
                lineGap: number
                unitsPerEm: number
                variable: true
                variationAxes: Array<{
                  default: number
                  max: number
                  min: number
                  name: string
                }>
                variations: Array<{
                  ascent: number
                  capHeight: number
                  codePoints: Array<{
                    advanceWidth: number
                    codePoint: number
                    height: number
                    leftSideBearing: number
                    width: number
                    xMax: number
                    xMin: number
                    yMax: number
                    yMin: number
                  }>
                  descent: number
                  features: Array<{
                    name: string
                    type: 'positioning' | 'substitution'
                  }>
                  id: string
                  lineGap: number
                  unitsPerEm: number
                  variable: false
                  xHeight: number
                  xWidthAvg: number
                  familyName?: string | null | undefined
                  fullName?: string | null | undefined
                  namedInstance?: string | null | undefined
                  namedInstancePostScriptName?: string | null | undefined
                  postScriptName?: string | null | undefined
                  subfamilyName?: string | null | undefined
                  typographicFamilyName?: string | null | undefined
                  typographicSubfamilyName?: string | null | undefined
                  wwsFamilyName?: string | null | undefined
                  wwsSubFamilyName?: string | null | undefined
                }>
                xHeight: number
                xWidthAvg: number
                familyName?: string | null | undefined
                fullName?: string | null | undefined
                postScriptName?: string | null | undefined
                subfamilyName?: string | null | undefined
                typographicFamilyName?: string | null | undefined
                typographicSubfamilyName?: string | null | undefined
                wwsFamilyName?: string | null | undefined
                wwsSubFamilyName?: string | null | undefined
              }
          >
        | undefined
      fontStretch?: number | undefined
      fontStyle?: 'italic' | 'normal' | undefined
      fontVariationSettings?: 'normal' | Record<string, number> | undefined
      fontWeight?: number | undefined
    }>
  >,
  {},
  {}
>
export declare const schemaLocales: z.ZodEffects<
  z.ZodRecord<
    z.ZodString,
    z.ZodUnion<
      [
        z.ZodString,
        z.ZodObject<
          {},
          'strip',
          z.ZodType<
            StyleRule<{
              fontFamily?:
                | {
                    fallbacks: FontInformation[]
                    fonts: InferFont[]
                  }
                | undefined
              fontStretch?: number | undefined
              fontStyle?: 'italic' | 'normal' | undefined
              fontVariationSettings?: 'normal' | Record<string, number> | undefined
              fontWeight?: number | undefined
            }>,
            z.ZodTypeDef,
            StyleRule<{
              fontFamily?:
                | Array<
                    | InputFont
                    | {
                        ascent: number
                        capHeight: number
                        codePoints: Array<{
                          advanceWidth: number
                          codePoint: number
                          height: number
                          leftSideBearing: number
                          width: number
                          xMax: number
                          xMin: number
                          yMax: number
                          yMin: number
                        }>
                        descent: number
                        features: Array<{
                          name: string
                          type: 'positioning' | 'substitution'
                        }>
                        id: string
                        lineGap: number
                        unitsPerEm: number
                        variable: false
                        xHeight: number
                        xWidthAvg: number
                        familyName?: string | null | undefined
                        fullName?: string | null | undefined
                        namedInstance?: string | null | undefined
                        namedInstancePostScriptName?: string | null | undefined
                        postScriptName?: string | null | undefined
                        subfamilyName?: string | null | undefined
                        typographicFamilyName?: string | null | undefined
                        typographicSubfamilyName?: string | null | undefined
                        wwsFamilyName?: string | null | undefined
                        wwsSubFamilyName?: string | null | undefined
                      }
                    | {
                        ascent: number
                        capHeight: number
                        codePoints: Array<{
                          advanceWidth: number
                          codePoint: number
                          height: number
                          leftSideBearing: number
                          width: number
                          xMax: number
                          xMin: number
                          yMax: number
                          yMin: number
                        }>
                        descent: number
                        features: Array<{
                          name: string
                          type: 'positioning' | 'substitution'
                        }>
                        id: string
                        lineGap: number
                        unitsPerEm: number
                        variable: true
                        variationAxes: Array<{
                          default: number
                          max: number
                          min: number
                          name: string
                        }>
                        variations: Array<{
                          ascent: number
                          capHeight: number
                          codePoints: Array<{
                            advanceWidth: number
                            codePoint: number
                            height: number
                            leftSideBearing: number
                            width: number
                            xMax: number
                            xMin: number
                            yMax: number
                            yMin: number
                          }>
                          descent: number
                          features: Array<{
                            name: string
                            type: 'positioning' | 'substitution'
                          }>
                          id: string
                          lineGap: number
                          unitsPerEm: number
                          variable: false
                          xHeight: number
                          xWidthAvg: number
                          familyName?: string | null | undefined
                          fullName?: string | null | undefined
                          namedInstance?: string | null | undefined
                          namedInstancePostScriptName?: string | null | undefined
                          postScriptName?: string | null | undefined
                          subfamilyName?: string | null | undefined
                          typographicFamilyName?: string | null | undefined
                          typographicSubfamilyName?: string | null | undefined
                          wwsFamilyName?: string | null | undefined
                          wwsSubFamilyName?: string | null | undefined
                        }>
                        xHeight: number
                        xWidthAvg: number
                        familyName?: string | null | undefined
                        fullName?: string | null | undefined
                        postScriptName?: string | null | undefined
                        subfamilyName?: string | null | undefined
                        typographicFamilyName?: string | null | undefined
                        typographicSubfamilyName?: string | null | undefined
                        wwsFamilyName?: string | null | undefined
                        wwsSubFamilyName?: string | null | undefined
                      }
                  >
                | undefined
              fontStretch?: number | undefined
              fontStyle?: 'italic' | 'normal' | undefined
              fontVariationSettings?: 'normal' | Record<string, number> | undefined
              fontWeight?: number | undefined
            }>
          >,
          {},
          {}
        >,
      ]
    >
  >,
  {
    [key: string]: string | {}
  },
  Record<string, string | {}>
>
export interface WebFontLocale {
  font: WebFont[]
  fontFace: string
  noScriptStyle: string
  order: string[] | undefined
  style: string
}
export interface WebFontsJson {
  alias: Record<string, string>
  font: WebFont[]
  fontFace: string
  locale: Record<string, WebFontLocale>
  noScriptStyle: string
  order: string[] | undefined
  script: string
  style: string
}

//# sourceMappingURL=user-schema.d.ts.map
