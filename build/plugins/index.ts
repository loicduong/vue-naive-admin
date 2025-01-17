import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevtools from 'vite-plugin-vue-devtools'
import { setupHtmlPlugin } from './html'
import { setupPwaPlugin } from './pwa'
import { setupRouter } from './router'
import { setupUnocss } from './unocss'
import { setupUnplugin } from './unplugin'

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string, buildVersion: string) {
  const plugins: PluginOption = [
    ...setupRouter(),
    vue(),
    vueJsx(),
    VueDevtools(),
    setupUnocss(viteEnv),
    ...setupUnplugin(viteEnv),
    setupHtmlPlugin(buildTime, buildVersion),
    setupPwaPlugin(),
  ]

  return plugins
}
