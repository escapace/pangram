import type { UserConfiguration } from './types'

export async function defineConfig(
  ...arguments_:
    | [config: () => UserConfiguration]
    | [config: Promise<() => UserConfiguration>]
    | [config: Promise<UserConfiguration>]
    | [config: UserConfiguration]
): Promise<UserConfiguration> {
  const config = arguments_[0]

  const resolved = await Promise.resolve(config)

  if (typeof resolved === 'function') {
    const value = (resolved as () => UserConfiguration)()
    return value
  } else {
    return resolved
  }
}
