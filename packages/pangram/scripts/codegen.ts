import * as fs from 'node:fs'
import * as path from 'node:path'
import { execSync } from 'node:child_process'

const destinationPath = path.resolve('src/types.ts')

execSync(
  `pnpm exec tsc --emitDeclarationOnly --declarationDir ${path.resolve('lib/user-schema')} -p ${path.resolve('../container/tsconfig-build-user-schema.json')}`,
  { encoding: 'utf-8', stdio: 'pipe' },
)
fs.copyFileSync(path.resolve('lib/user-schema/state/user-schema.d.ts'), destinationPath)

try {
  execSync(`pnpm exec eslint --fix ${destinationPath}`, { encoding: 'utf-8', stdio: 'ignore' })
} catch (error) {}

execSync(`pnpm exec prettier --write ${destinationPath}`, { encoding: 'utf-8', stdio: 'pipe' })
