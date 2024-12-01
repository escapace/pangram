import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { assert, describe, it } from 'vitest'
import { pangram } from './pangram'

const dirname = path.dirname(fileURLToPath(import.meta.url))

describe('src/pangram.spec.ts', { timeout: 60_000 }, function () {
  it('happy-path', async () => {
    assert.isFunction(pangram)

    const result = await pangram({
      cwd: path.resolve(dirname, '../test/happy-path'),
    })

    assert.isObject(result)
  })
})
