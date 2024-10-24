import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import progress from 'vite-plugin-progress'
import VueDevtools from 'vite-plugin-vue-devtools'
import { setupHtmlPlugin } from './html'
import { setupElegantRouter } from './router'
import { setupUnocss } from './unocss'
import { setupUnplugin } from './unplugin'

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string, buildVersion: string) {
  const plugins: PluginOption = [
    vue(),
    vueJsx(),
    VueDevtools(),
    setupElegantRouter(),
    setupUnocss(viteEnv),
    ...setupUnplugin(viteEnv),
    progress(),
    setupHtmlPlugin(buildTime, buildVersion),
  ]

  return plugins
}
