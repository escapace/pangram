import { assert, describe, it } from 'vitest'
import { fontFamilyQuote } from './font-family-quote'

describe('fontFamilyQuote', () => {
  it('.', () => {
    assert.equal(fontFamilyQuote('sans-serif'), 'sans-serif')
    assert.equal(fontFamilyQuote('noto'), 'noto')
    assert.equal(fontFamilyQuote('"noto sans"'), '"noto sans"')
    assert.equal(fontFamilyQuote("'noto sans'"), '"noto sans"')
    assert.equal(fontFamilyQuote('noto"sans'), '"noto\\"sans"')
  })
})
