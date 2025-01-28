import { describe, it, assert } from 'vitest'
import { style } from './style'

describe('src/utilities/style.spec.ts', () => {
  it('.', () => {
    const string = style('.test', {
      '@media': {
        '(prefers-reduced-motion)': {
          transitionProperty: 'color',
        },
        'screen and (min-width: 768px)': {
          '@supports': {
            '(display: grid)': {
              display: 'grid',
            },
          },
          'padding': 10,
        },
      },
      '@supports': {
        '(display: grid)': {
          display: 'grid',
        },
      },
      'display': ['flex', 'inline-flex'],
      'margin': 0,
      'paddingTop': '3px',
    })

    assert.isString(string)
  })
})
