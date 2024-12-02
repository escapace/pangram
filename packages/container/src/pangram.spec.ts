import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { assert, describe, it } from 'vitest'
import { pangram } from './pangram'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const isCointainer = () => process.env.CONTAINER_TEST?.toLowerCase() === 'true'

describe.runIf(isCointainer())('case-a', { timeout: 20 * 60 * 1000 }, () => {
  it('happy-path', async () => {
    assert.isFunction(pangram)
    const result = await pangram({
      cwd: path.resolve(dirname, '../test/happy-path'),
    })
    assert.isObject(result)
  })
})
