import { exec as _exec } from 'node:child_process'
import path from 'node:path'
import { promisify } from 'node:util'
const exec = promisify(_exec)

const dirname = path.resolve(import.meta.dirname, '../')
process.chdir(dirname)

// const packageJSON = JSON.parse(await readFile(path.join(dirname, 'package.json'), 'utf-8')) as {
//   version: string
//   dependencies?: Record<string, string>
//   peerDependencies?: Record<string, string>
// }
//
// const constants = JSON.parse(
//   await readFile(path.join(import.meta.dirname, 'constants.json'), 'utf-8'),
// ) as {
//   builds: Record<string, BuildOptions>
// }
//
// for (const value of Object.values(constants.builds)) {
//   await build({
//     absWorkingDir: dirname,
//     external: [
//       ...Object.keys(packageJSON.dependencies ?? []),
//       ...Object.keys(packageJSON.peerDependencies ?? []),
//     ],
//     sourcemap: true,
//     sourcesContent: false,
//     splitting: true,
//     treeShaking: true,
//     tsconfig: 'tsconfig-build.json',
//     ...value,
//     define: {
//       __VERSION__: JSON.stringify(packageJSON.version),
//       ...value.define,
//     },
//     rollup: {
//       experimentalLogSideEffects: true,
//       ...value.rollup,
//     },
//     supported: {
//       'const-and-let': true,
//       ...value.supported,
//     },
//   })
// }

await exec(
  'pnpm exec esbuild --bundle src/index.ts --loader:.json=copy --splitting --format=esm --platform=neutral --outdir=lib/neutral --tsconfig=tsconfig-build.json',
)

await exec(
  'pnpm exec tsc -p ./tsconfig-build.json --emitDeclarationOnly --declarationDir lib/types',
)
