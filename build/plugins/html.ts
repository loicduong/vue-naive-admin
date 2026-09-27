import type { Plugin } from 'vite-plus'

export function setupHtmlPlugin(buildTime: string, buildVersion: string) {
  const plugin: Plugin = {
    name: 'html-plugin',
    apply: 'build',
    transformIndexHtml(html) {
      return html
        .replace(
          '<head>',
          `<head>\n    <meta name="build-time" content="${buildTime}">\n    <meta name="build-version" content="${buildVersion}">`,
        )
        .replace('runtime.config.js', `runtime.config.js?v=${buildVersion}`)
    },
  }

  return plugin
}
