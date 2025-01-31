import 'vue/server-renderer'

declare module 'vue/server-renderer' {
  export interface SSRContext {
    modules?: string[]
    teleports?: Record<string, string>
  }
}
