import { minify } from 'html-minifier-terser'
import type { Plugin } from 'vite'

export function setupHtmlPlugin(buildTime: string, buildVersion: string) {
  const plugin: Plugin = {
    name: 'html-plugin',
    apply: 'build',
    async transformIndexHtml(html) {
      const htmlStr = html.replace('<head>', `<head>\n    <meta name="build-time" content="${buildTime}">\n    <meta name="build-version" content="${buildVersion}">`)

      return await minify(htmlStr, {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
      })
    },
  }

  return plugin
}
