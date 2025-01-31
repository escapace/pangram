import type { Options } from '@pointe/types'
import { Hono } from 'hono'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import { createApp as _createApp } from './create-app'
import webFonts from './fonts.json'

export const createApp = async (options: Options = POINTE_OPTIONS) => {
  const hono = new Hono()

  if (import.meta.env.MODE === 'staging') {
    const { serveStatic } = await import('@hono/node-server/serve-static')
    hono.use('*', serveStatic({ root: '../client' }))
  }

  hono.get('*', async (c) => {
    const { app, router } = _createApp()

    const url = new URL(c.req.url)

    await router.push(url.pathname)
    await router.isReady()

    const route: Readonly<RouteLocationNormalizedLoaded> = router.currentRoute.value

    if (route.matched.length === 0) {
      return await c.notFound()
    } else {
      const appHTML = await renderToString(app, {})

      const styles = [
        `<style>${webFonts.fontFace}</style>`,
        `<style>${webFonts.style}</style>`,
        `<noscript><style>${webFonts.noScriptStyle}</style></noscript>`,
        `<script>${webFonts.script}</script>`,
        `<script>window.webFontLoader(${JSON.stringify('en')});</script>`,
      ].join('\n')

      const html = options.template
        .replace('<!--app-html-->', appHTML)
        .replace('<!--app-styles-->', styles)
        .replace('<!--app-html-tag-->', ` lang="en"`)

      return c.html(html)
    }
  })

  return { fetch: hono.request, hono }
}

if (
  import.meta.env.MODE === 'staging' &&
  process.argv[1] === (await import('node:url')).fileURLToPath(import.meta.url)
) {
  const { fileURLToPath } = await import('node:url')
  const path = await import('node:path')

  process.chdir(path.dirname(fileURLToPath(import.meta.url)))

  const { hono } = await createApp()
  const { serve } = await import('@hono/node-server')

  serve({
    ...hono,
    hostname: process.env.HOST,
    port: typeof process.env.PORT === 'string' ? parseInt(process.env.PORT) : 3000,
  })
}

export default (await createApp()).hono
