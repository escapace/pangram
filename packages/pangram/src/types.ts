import type { Font } from '@pangram/font-loader'
import type { z } from 'zod'
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
      consistentMetrics: z.ZodBoolean
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
      legacyFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      legacySubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      lineGap: z.ZodNumber
      postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
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
    consistentMetrics: boolean
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
    legacyFamilyName?: string | null | undefined
    legacySubfamilyName?: string | null | undefined
    namedInstance?: string | null | undefined
    namedInstancePostScriptName?: string | null | undefined
    postScriptName?: string | null | undefined
    subfamilyName?: string | null | undefined
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
    consistentMetrics: boolean
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
    legacyFamilyName?: string | null | undefined
    legacySubfamilyName?: string | null | undefined
    namedInstance?: string | null | undefined
    namedInstancePostScriptName?: string | null | undefined
    postScriptName?: string | null | undefined
    subfamilyName?: string | null | undefined
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
              consistentMetrics: z.ZodBoolean
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
              legacyFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
              legacySubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
              lineGap: z.ZodNumber
              postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
              subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
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
            consistentMetrics: boolean
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
            legacyFamilyName?: string | null | undefined
            legacySubfamilyName?: string | null | undefined
            namedInstance?: string | null | undefined
            namedInstancePostScriptName?: string | null | undefined
            postScriptName?: string | null | undefined
            subfamilyName?: string | null | undefined
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
            consistentMetrics: boolean
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
            legacyFamilyName?: string | null | undefined
            legacySubfamilyName?: string | null | undefined
            namedInstance?: string | null | undefined
            namedInstancePostScriptName?: string | null | undefined
            postScriptName?: string | null | undefined
            subfamilyName?: string | null | undefined
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
      consistentMetrics: z.ZodBoolean
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
      legacyFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      legacySubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      lineGap: z.ZodNumber
      postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
      subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
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
    consistentMetrics: boolean
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
      consistentMetrics: boolean
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
      legacyFamilyName?: string | null | undefined
      legacySubfamilyName?: string | null | undefined
      namedInstance?: string | null | undefined
      namedInstancePostScriptName?: string | null | undefined
      postScriptName?: string | null | undefined
      subfamilyName?: string | null | undefined
      wwsFamilyName?: string | null | undefined
      wwsSubFamilyName?: string | null | undefined
    }>
    xHeight: number
    xWidthAvg: number
    familyName?: string | null | undefined
    fullName?: string | null | undefined
    legacyFamilyName?: string | null | undefined
    legacySubfamilyName?: string | null | undefined
    postScriptName?: string | null | undefined
    subfamilyName?: string | null | undefined
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
    consistentMetrics: boolean
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
      consistentMetrics: boolean
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
      legacyFamilyName?: string | null | undefined
      legacySubfamilyName?: string | null | undefined
      namedInstance?: string | null | undefined
      namedInstancePostScriptName?: string | null | undefined
      postScriptName?: string | null | undefined
      subfamilyName?: string | null | undefined
      wwsFamilyName?: string | null | undefined
      wwsSubFamilyName?: string | null | undefined
    }>
    xHeight: number
    xWidthAvg: number
    familyName?: string | null | undefined
    fullName?: string | null | undefined
    legacyFamilyName?: string | null | undefined
    legacySubfamilyName?: string | null | undefined
    postScriptName?: string | null | undefined
    subfamilyName?: string | null | undefined
    wwsFamilyName?: string | null | undefined
    wwsSubFamilyName?: string | null | undefined
  }
>
export type UserConfigurationFontInformationStatic = z.infer<typeof schemaFontInformationStatic>
export type UserConfigurationFontInformationVariation = z.infer<
  typeof schemaFontInformationVariation
>
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
                  consistentMetrics: z.ZodBoolean
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
                  legacyFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                  legacySubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                  lineGap: z.ZodNumber
                  postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                  subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
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
                consistentMetrics: boolean
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
                legacyFamilyName?: string | null | undefined
                legacySubfamilyName?: string | null | undefined
                namedInstance?: string | null | undefined
                namedInstancePostScriptName?: string | null | undefined
                postScriptName?: string | null | undefined
                subfamilyName?: string | null | undefined
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
                consistentMetrics: boolean
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
                legacyFamilyName?: string | null | undefined
                legacySubfamilyName?: string | null | undefined
                namedInstance?: string | null | undefined
                namedInstancePostScriptName?: string | null | undefined
                postScriptName?: string | null | undefined
                subfamilyName?: string | null | undefined
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
          consistentMetrics: z.ZodBoolean
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
          legacyFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          legacySubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          lineGap: z.ZodNumber
          postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
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
        consistentMetrics: boolean
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
          consistentMetrics: boolean
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
          legacyFamilyName?: string | null | undefined
          legacySubfamilyName?: string | null | undefined
          namedInstance?: string | null | undefined
          namedInstancePostScriptName?: string | null | undefined
          postScriptName?: string | null | undefined
          subfamilyName?: string | null | undefined
          wwsFamilyName?: string | null | undefined
          wwsSubFamilyName?: string | null | undefined
        }>
        xHeight: number
        xWidthAvg: number
        familyName?: string | null | undefined
        fullName?: string | null | undefined
        legacyFamilyName?: string | null | undefined
        legacySubfamilyName?: string | null | undefined
        postScriptName?: string | null | undefined
        subfamilyName?: string | null | undefined
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
        consistentMetrics: boolean
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
          consistentMetrics: boolean
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
          legacyFamilyName?: string | null | undefined
          legacySubfamilyName?: string | null | undefined
          namedInstance?: string | null | undefined
          namedInstancePostScriptName?: string | null | undefined
          postScriptName?: string | null | undefined
          subfamilyName?: string | null | undefined
          wwsFamilyName?: string | null | undefined
          wwsSubFamilyName?: string | null | undefined
        }>
        xHeight: number
        xWidthAvg: number
        familyName?: string | null | undefined
        fullName?: string | null | undefined
        legacyFamilyName?: string | null | undefined
        legacySubfamilyName?: string | null | undefined
        postScriptName?: string | null | undefined
        subfamilyName?: string | null | undefined
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
          consistentMetrics: z.ZodBoolean
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
          legacyFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          legacySubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          lineGap: z.ZodNumber
          postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
          subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
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
        consistentMetrics: boolean
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
        legacyFamilyName?: string | null | undefined
        legacySubfamilyName?: string | null | undefined
        namedInstance?: string | null | undefined
        namedInstancePostScriptName?: string | null | undefined
        postScriptName?: string | null | undefined
        subfamilyName?: string | null | undefined
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
        consistentMetrics: boolean
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
        legacyFamilyName?: string | null | undefined
        legacySubfamilyName?: string | null | undefined
        namedInstance?: string | null | undefined
        namedInstancePostScriptName?: string | null | undefined
        postScriptName?: string | null | undefined
        subfamilyName?: string | null | undefined
        wwsFamilyName?: string | null | undefined
        wwsSubFamilyName?: string | null | undefined
      }
    >,
  ]
>
export type ConfigurationFont = {
  prefer?: ConfigurationFont[]
} & z.infer<typeof schemaFontPlaceholder>
export type ConfigurationLocale = Record<string, ConfigurationRule>
export type ConfigurationLocales = Record<string, string | ConfigurationLocale>
export type ConfigurationRule = z.infer<typeof schemaRule>
export type UserConfigurationFont = {
  prefer?: UserConfigurationFont[]
} & z.input<typeof schemaFontPlaceholder>
export type UserConfigurationFontInformation = z.infer<typeof schemaFontInformation>
export type UserConfigurationLocale = Record<string, UserConfigurationRule>
export type UserConfigurationLocales = Record<string, string | UserConfigurationLocale>
export type UserConfigurationRule = z.input<typeof schemaRule>
declare const schemaFontFamilyGeneric: z.ZodEnum<
  [
    'caption ',
    'cursive',
    'fantasy',
    'icon ',
    'math',
    'menu ',
    'message-box ',
    'monospace',
    'sans-serif',
    'serif',
    'small-caption ',
    'status-bar',
    'system-ui',
    'ui-monospace',
    'ui-rounded',
    'ui-sans-serif',
    'ui-serif',
  ]
>
export type ConfigurationFontFaimlyGeneric = z.infer<typeof schemaFontFamilyGeneric>
export declare const schemaFontPlaceholder: z.ZodObject<
  {
    desubroutinize: z.ZodDefault<z.ZodBoolean>
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
    family: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>
    format: z.ZodEffects<
      z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<'woff'>, z.ZodLiteral<'woff2'>]>>>,
      Array<'woff' | 'woff2'>,
      Array<'woff' | 'woff2'> | undefined
    >
    layoutFeatures: z.ZodOptional<z.ZodArray<z.ZodString>>
    resourceHint: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<'preload'>, z.ZodLiteral<'prefetch'>]>>
    source: z.ZodEffects<z.ZodString, string, string>
    tech: z.ZodOptional<z.ZodArray<z.ZodEnum<['variations']>>>
    unicodeRange: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>
  },
  'strip',
  z.ZodTypeAny,
  {
    desubroutinize: boolean
    format: Array<'woff' | 'woff2'>
    source: string
    display?: 'auto' | 'block' | 'fallback' | 'optional' | 'swap' | undefined
    family?: string | undefined
    layoutFeatures?: string[] | undefined
    resourceHint?: 'prefetch' | 'preload' | undefined
    tech?: Array<'variations'> | undefined
    unicodeRange?: string | undefined
  },
  {
    source: string
    desubroutinize?: boolean | undefined
    display?: 'auto' | 'block' | 'fallback' | 'optional' | 'swap' | undefined
    family?: string | undefined
    format?: Array<'woff' | 'woff2'> | undefined
    layoutFeatures?: string[] | undefined
    resourceHint?: 'prefetch' | 'preload' | undefined
    tech?: Array<'variations'> | undefined
    unicodeRange?: string | undefined
  }
>
declare const schemaFontFamily: z.ZodEffects<
  z.ZodArray<
    z.ZodUnion<
      [
        z.ZodUnion<
          [
            z.ZodType<ConfigurationFont, z.ZodTypeDef, UserConfigurationFont>,
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
                              consistentMetrics: z.ZodBoolean
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
                              legacyFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                              legacySubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                              lineGap: z.ZodNumber
                              postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                              subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
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
                            consistentMetrics: boolean
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
                            legacyFamilyName?: string | null | undefined
                            legacySubfamilyName?: string | null | undefined
                            namedInstance?: string | null | undefined
                            namedInstancePostScriptName?: string | null | undefined
                            postScriptName?: string | null | undefined
                            subfamilyName?: string | null | undefined
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
                            consistentMetrics: boolean
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
                            legacyFamilyName?: string | null | undefined
                            legacySubfamilyName?: string | null | undefined
                            namedInstance?: string | null | undefined
                            namedInstancePostScriptName?: string | null | undefined
                            postScriptName?: string | null | undefined
                            subfamilyName?: string | null | undefined
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
                      consistentMetrics: z.ZodBoolean
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
                      legacyFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                      legacySubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                      lineGap: z.ZodNumber
                      postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                      subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
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
                    consistentMetrics: boolean
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
                      consistentMetrics: boolean
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
                      legacyFamilyName?: string | null | undefined
                      legacySubfamilyName?: string | null | undefined
                      namedInstance?: string | null | undefined
                      namedInstancePostScriptName?: string | null | undefined
                      postScriptName?: string | null | undefined
                      subfamilyName?: string | null | undefined
                      wwsFamilyName?: string | null | undefined
                      wwsSubFamilyName?: string | null | undefined
                    }>
                    xHeight: number
                    xWidthAvg: number
                    familyName?: string | null | undefined
                    fullName?: string | null | undefined
                    legacyFamilyName?: string | null | undefined
                    legacySubfamilyName?: string | null | undefined
                    postScriptName?: string | null | undefined
                    subfamilyName?: string | null | undefined
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
                    consistentMetrics: boolean
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
                      consistentMetrics: boolean
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
                      legacyFamilyName?: string | null | undefined
                      legacySubfamilyName?: string | null | undefined
                      namedInstance?: string | null | undefined
                      namedInstancePostScriptName?: string | null | undefined
                      postScriptName?: string | null | undefined
                      subfamilyName?: string | null | undefined
                      wwsFamilyName?: string | null | undefined
                      wwsSubFamilyName?: string | null | undefined
                    }>
                    xHeight: number
                    xWidthAvg: number
                    familyName?: string | null | undefined
                    fullName?: string | null | undefined
                    legacyFamilyName?: string | null | undefined
                    legacySubfamilyName?: string | null | undefined
                    postScriptName?: string | null | undefined
                    subfamilyName?: string | null | undefined
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
                      consistentMetrics: z.ZodBoolean
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
                      legacyFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                      legacySubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                      lineGap: z.ZodNumber
                      postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                      subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
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
                    consistentMetrics: boolean
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
                    legacyFamilyName?: string | null | undefined
                    legacySubfamilyName?: string | null | undefined
                    namedInstance?: string | null | undefined
                    namedInstancePostScriptName?: string | null | undefined
                    postScriptName?: string | null | undefined
                    subfamilyName?: string | null | undefined
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
                    consistentMetrics: boolean
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
                    legacyFamilyName?: string | null | undefined
                    legacySubfamilyName?: string | null | undefined
                    namedInstance?: string | null | undefined
                    namedInstancePostScriptName?: string | null | undefined
                    postScriptName?: string | null | undefined
                    subfamilyName?: string | null | undefined
                    wwsFamilyName?: string | null | undefined
                    wwsSubFamilyName?: string | null | undefined
                  }
                >,
              ]
            >,
          ]
        >,
        z.ZodEnum<
          [
            'caption ',
            'cursive',
            'fantasy',
            'icon ',
            'math',
            'menu ',
            'message-box ',
            'monospace',
            'sans-serif',
            'serif',
            'small-caption ',
            'status-bar',
            'system-ui',
            'ui-monospace',
            'ui-rounded',
            'ui-sans-serif',
            'ui-serif',
          ]
        >,
      ]
    >
  >,
  {
    fallbacks: UserConfigurationFontInformation[]
    fallbacksGeneric: ConfigurationFontFaimlyGeneric[]
    fonts: ConfigurationFont[]
  },
  Array<
    | 'caption '
    | 'cursive'
    | 'fantasy'
    | 'icon '
    | 'math'
    | 'menu '
    | 'message-box '
    | 'monospace'
    | 'sans-serif'
    | 'serif'
    | 'small-caption '
    | 'status-bar'
    | 'system-ui'
    | 'ui-monospace'
    | 'ui-rounded'
    | 'ui-sans-serif'
    | 'ui-serif'
    | UserConfigurationFont
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
        consistentMetrics: boolean
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
        legacyFamilyName?: string | null | undefined
        legacySubfamilyName?: string | null | undefined
        namedInstance?: string | null | undefined
        namedInstancePostScriptName?: string | null | undefined
        postScriptName?: string | null | undefined
        subfamilyName?: string | null | undefined
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
        consistentMetrics: boolean
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
          consistentMetrics: boolean
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
          legacyFamilyName?: string | null | undefined
          legacySubfamilyName?: string | null | undefined
          namedInstance?: string | null | undefined
          namedInstancePostScriptName?: string | null | undefined
          postScriptName?: string | null | undefined
          subfamilyName?: string | null | undefined
          wwsFamilyName?: string | null | undefined
          wwsSubFamilyName?: string | null | undefined
        }>
        xHeight: number
        xWidthAvg: number
        familyName?: string | null | undefined
        fullName?: string | null | undefined
        legacyFamilyName?: string | null | undefined
        legacySubfamilyName?: string | null | undefined
        postScriptName?: string | null | undefined
        subfamilyName?: string | null | undefined
        wwsFamilyName?: string | null | undefined
        wwsSubFamilyName?: string | null | undefined
      }
  >
>
export type ConfigurationFontFamily = z.infer<typeof schemaFontFamily>
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
              z.ZodUnion<
                [
                  z.ZodType<ConfigurationFont, z.ZodTypeDef, UserConfigurationFont>,
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
                                    consistentMetrics: z.ZodBoolean
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
                                    legacyFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                                    legacySubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                                    lineGap: z.ZodNumber
                                    postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                                    subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
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
                                  consistentMetrics: boolean
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
                                  legacyFamilyName?: string | null | undefined
                                  legacySubfamilyName?: string | null | undefined
                                  namedInstance?: string | null | undefined
                                  namedInstancePostScriptName?: string | null | undefined
                                  postScriptName?: string | null | undefined
                                  subfamilyName?: string | null | undefined
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
                                  consistentMetrics: boolean
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
                                  legacyFamilyName?: string | null | undefined
                                  legacySubfamilyName?: string | null | undefined
                                  namedInstance?: string | null | undefined
                                  namedInstancePostScriptName?: string | null | undefined
                                  postScriptName?: string | null | undefined
                                  subfamilyName?: string | null | undefined
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
                            consistentMetrics: z.ZodBoolean
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
                            legacyFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                            legacySubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                            lineGap: z.ZodNumber
                            postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                            subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
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
                          consistentMetrics: boolean
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
                            consistentMetrics: boolean
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
                            legacyFamilyName?: string | null | undefined
                            legacySubfamilyName?: string | null | undefined
                            namedInstance?: string | null | undefined
                            namedInstancePostScriptName?: string | null | undefined
                            postScriptName?: string | null | undefined
                            subfamilyName?: string | null | undefined
                            wwsFamilyName?: string | null | undefined
                            wwsSubFamilyName?: string | null | undefined
                          }>
                          xHeight: number
                          xWidthAvg: number
                          familyName?: string | null | undefined
                          fullName?: string | null | undefined
                          legacyFamilyName?: string | null | undefined
                          legacySubfamilyName?: string | null | undefined
                          postScriptName?: string | null | undefined
                          subfamilyName?: string | null | undefined
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
                          consistentMetrics: boolean
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
                            consistentMetrics: boolean
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
                            legacyFamilyName?: string | null | undefined
                            legacySubfamilyName?: string | null | undefined
                            namedInstance?: string | null | undefined
                            namedInstancePostScriptName?: string | null | undefined
                            postScriptName?: string | null | undefined
                            subfamilyName?: string | null | undefined
                            wwsFamilyName?: string | null | undefined
                            wwsSubFamilyName?: string | null | undefined
                          }>
                          xHeight: number
                          xWidthAvg: number
                          familyName?: string | null | undefined
                          fullName?: string | null | undefined
                          legacyFamilyName?: string | null | undefined
                          legacySubfamilyName?: string | null | undefined
                          postScriptName?: string | null | undefined
                          subfamilyName?: string | null | undefined
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
                            consistentMetrics: z.ZodBoolean
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
                            legacyFamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                            legacySubfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                            lineGap: z.ZodNumber
                            postScriptName: z.ZodNullable<z.ZodOptional<z.ZodString>>
                            subfamilyName: z.ZodNullable<z.ZodOptional<z.ZodString>>
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
                          consistentMetrics: boolean
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
                          legacyFamilyName?: string | null | undefined
                          legacySubfamilyName?: string | null | undefined
                          namedInstance?: string | null | undefined
                          namedInstancePostScriptName?: string | null | undefined
                          postScriptName?: string | null | undefined
                          subfamilyName?: string | null | undefined
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
                          consistentMetrics: boolean
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
                          legacyFamilyName?: string | null | undefined
                          legacySubfamilyName?: string | null | undefined
                          namedInstance?: string | null | undefined
                          namedInstancePostScriptName?: string | null | undefined
                          postScriptName?: string | null | undefined
                          subfamilyName?: string | null | undefined
                          wwsFamilyName?: string | null | undefined
                          wwsSubFamilyName?: string | null | undefined
                        }
                      >,
                    ]
                  >,
                ]
              >,
              z.ZodEnum<
                [
                  'caption ',
                  'cursive',
                  'fantasy',
                  'icon ',
                  'math',
                  'menu ',
                  'message-box ',
                  'monospace',
                  'sans-serif',
                  'serif',
                  'small-caption ',
                  'status-bar',
                  'system-ui',
                  'ui-monospace',
                  'ui-rounded',
                  'ui-sans-serif',
                  'ui-serif',
                ]
              >,
            ]
          >
        >,
        {
          fallbacks: UserConfigurationFontInformation[]
          fallbacksGeneric: ConfigurationFontFaimlyGeneric[]
          fonts: ConfigurationFont[]
        },
        Array<
          | 'caption '
          | 'cursive'
          | 'fantasy'
          | 'icon '
          | 'math'
          | 'menu '
          | 'message-box '
          | 'monospace'
          | 'sans-serif'
          | 'serif'
          | 'small-caption '
          | 'status-bar'
          | 'system-ui'
          | 'ui-monospace'
          | 'ui-rounded'
          | 'ui-sans-serif'
          | 'ui-serif'
          | UserConfigurationFont
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
              consistentMetrics: boolean
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
              legacyFamilyName?: string | null | undefined
              legacySubfamilyName?: string | null | undefined
              namedInstance?: string | null | undefined
              namedInstancePostScriptName?: string | null | undefined
              postScriptName?: string | null | undefined
              subfamilyName?: string | null | undefined
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
              consistentMetrics: boolean
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
                consistentMetrics: boolean
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
                legacyFamilyName?: string | null | undefined
                legacySubfamilyName?: string | null | undefined
                namedInstance?: string | null | undefined
                namedInstancePostScriptName?: string | null | undefined
                postScriptName?: string | null | undefined
                subfamilyName?: string | null | undefined
                wwsFamilyName?: string | null | undefined
                wwsSubFamilyName?: string | null | undefined
              }>
              xHeight: number
              xWidthAvg: number
              familyName?: string | null | undefined
              fullName?: string | null | undefined
              legacyFamilyName?: string | null | undefined
              legacySubfamilyName?: string | null | undefined
              postScriptName?: string | null | undefined
              subfamilyName?: string | null | undefined
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
          fallbacks: UserConfigurationFontInformation[]
          fallbacksGeneric: ConfigurationFontFaimlyGeneric[]
          fonts: ConfigurationFont[]
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
          | 'caption '
          | 'cursive'
          | 'fantasy'
          | 'icon '
          | 'math'
          | 'menu '
          | 'message-box '
          | 'monospace'
          | 'sans-serif'
          | 'serif'
          | 'small-caption '
          | 'status-bar'
          | 'system-ui'
          | 'ui-monospace'
          | 'ui-rounded'
          | 'ui-sans-serif'
          | 'ui-serif'
          | UserConfigurationFont
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
              consistentMetrics: boolean
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
              legacyFamilyName?: string | null | undefined
              legacySubfamilyName?: string | null | undefined
              namedInstance?: string | null | undefined
              namedInstancePostScriptName?: string | null | undefined
              postScriptName?: string | null | undefined
              subfamilyName?: string | null | undefined
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
              consistentMetrics: boolean
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
                consistentMetrics: boolean
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
                legacyFamilyName?: string | null | undefined
                legacySubfamilyName?: string | null | undefined
                namedInstance?: string | null | undefined
                namedInstancePostScriptName?: string | null | undefined
                postScriptName?: string | null | undefined
                subfamilyName?: string | null | undefined
                wwsFamilyName?: string | null | undefined
                wwsSubFamilyName?: string | null | undefined
              }>
              xHeight: number
              xWidthAvg: number
              familyName?: string | null | undefined
              fullName?: string | null | undefined
              legacyFamilyName?: string | null | undefined
              legacySubfamilyName?: string | null | undefined
              postScriptName?: string | null | undefined
              subfamilyName?: string | null | undefined
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
export declare const schemaFontPropertiesKeys: [
  'fontFamily',
  'fontStretch',
  'fontStyle',
  'fontVariationSettings',
  'fontWeight',
]
export type ConfigurationFontProperties = z.infer<typeof schemaFontProperties>
export type StyleRule<T extends {}> = {
  '@media'?: Record<string, StyleRule<T>>
  '@supports'?: Record<string, StyleRule<T>>
} & Omit<T, '@media' | '@supports'>
export type UserConfigurationFontProperties = z.input<typeof schemaFontProperties>
declare const schemaRule: z.ZodType<
  StyleRule<ConfigurationFontProperties>,
  z.ZodTypeDef,
  StyleRule<UserConfigurationFontProperties>
>
export declare const schemaLocale: z.ZodObject<
  {},
  'strip',
  z.ZodType<
    StyleRule<{
      fontFamily?:
        | {
            fallbacks: UserConfigurationFontInformation[]
            fallbacksGeneric: ConfigurationFontFaimlyGeneric[]
            fonts: ConfigurationFont[]
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
            | 'caption '
            | 'cursive'
            | 'fantasy'
            | 'icon '
            | 'math'
            | 'menu '
            | 'message-box '
            | 'monospace'
            | 'sans-serif'
            | 'serif'
            | 'small-caption '
            | 'status-bar'
            | 'system-ui'
            | 'ui-monospace'
            | 'ui-rounded'
            | 'ui-sans-serif'
            | 'ui-serif'
            | UserConfigurationFont
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
                consistentMetrics: boolean
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
                legacyFamilyName?: string | null | undefined
                legacySubfamilyName?: string | null | undefined
                namedInstance?: string | null | undefined
                namedInstancePostScriptName?: string | null | undefined
                postScriptName?: string | null | undefined
                subfamilyName?: string | null | undefined
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
                consistentMetrics: boolean
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
                  consistentMetrics: boolean
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
                  legacyFamilyName?: string | null | undefined
                  legacySubfamilyName?: string | null | undefined
                  namedInstance?: string | null | undefined
                  namedInstancePostScriptName?: string | null | undefined
                  postScriptName?: string | null | undefined
                  subfamilyName?: string | null | undefined
                  wwsFamilyName?: string | null | undefined
                  wwsSubFamilyName?: string | null | undefined
                }>
                xHeight: number
                xWidthAvg: number
                familyName?: string | null | undefined
                fullName?: string | null | undefined
                legacyFamilyName?: string | null | undefined
                legacySubfamilyName?: string | null | undefined
                postScriptName?: string | null | undefined
                subfamilyName?: string | null | undefined
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
                    fallbacks: UserConfigurationFontInformation[]
                    fallbacksGeneric: ConfigurationFontFaimlyGeneric[]
                    fonts: ConfigurationFont[]
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
                    | 'caption '
                    | 'cursive'
                    | 'fantasy'
                    | 'icon '
                    | 'math'
                    | 'menu '
                    | 'message-box '
                    | 'monospace'
                    | 'sans-serif'
                    | 'serif'
                    | 'small-caption '
                    | 'status-bar'
                    | 'system-ui'
                    | 'ui-monospace'
                    | 'ui-rounded'
                    | 'ui-sans-serif'
                    | 'ui-serif'
                    | UserConfigurationFont
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
                        consistentMetrics: boolean
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
                        legacyFamilyName?: string | null | undefined
                        legacySubfamilyName?: string | null | undefined
                        namedInstance?: string | null | undefined
                        namedInstancePostScriptName?: string | null | undefined
                        postScriptName?: string | null | undefined
                        subfamilyName?: string | null | undefined
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
                        consistentMetrics: boolean
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
                          consistentMetrics: boolean
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
                          legacyFamilyName?: string | null | undefined
                          legacySubfamilyName?: string | null | undefined
                          namedInstance?: string | null | undefined
                          namedInstancePostScriptName?: string | null | undefined
                          postScriptName?: string | null | undefined
                          subfamilyName?: string | null | undefined
                          wwsFamilyName?: string | null | undefined
                          wwsSubFamilyName?: string | null | undefined
                        }>
                        xHeight: number
                        xWidthAvg: number
                        familyName?: string | null | undefined
                        fullName?: string | null | undefined
                        legacyFamilyName?: string | null | undefined
                        legacySubfamilyName?: string | null | undefined
                        postScriptName?: string | null | undefined
                        subfamilyName?: string | null | undefined
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
export interface Locale {
  fontFace: string
  fonts: Font[]
  prefixes: string[]
  style: string
  order?: string[]
}
export interface Manifest {
  aliases: Record<string, string>
  locales: Record<string, Locale>
  script: string
}
export interface UserConfiguration {
  locales: UserConfigurationLocales
  adjustFontMetrics?: boolean
  lightningcss?: {
    exclude?: number | undefined
    include?: number | undefined
    minify?: boolean | undefined
  }
  manifest?: ((manifest: Manifest) => Promise<void>) | string
  outputDirectory?: string
  publicPath?: string
  selector?: string
}

//# sourceMappingURL=user-schema.d.ts.map
