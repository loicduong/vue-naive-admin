import type { RouteMeta } from 'vue-router'
import vueRouter from 'unplugin-vue-router/vite'
import layouts from 'vite-plugin-vue-layouts'

export function setupRouter() {
  return [
    vueRouter({
      dts: 'src/types/typed-router.d.ts',
      extendRoute(route) {
        const key = route.name as App.Global.RouteKey

        const constantRoutes: App.Global.RouteKey[] = ['/login', '/403', '/404', '/500']

        const builtinRoutes: App.Global.RouteKey[] = ['/', '/[...all]']

        const meta: Partial<RouteMeta> = {
          title: key,
        }

        if (!builtinRoutes.includes(key)) {
          meta.i18nKey = `route.${key}` as App.I18n.I18nKey
        }

        if (constantRoutes.includes(key)) {
          meta.constant = true
          meta.hideInMenu = true
          meta.layout = 'blank'
        }

        route.addToMeta(meta)

        if (key === '/login') {
          const modules: UnionKey.LoginModule[] = [
            'pwd-login',
            'code-login',
            'register',
            'reset-pwd',
          ]

          const moduleReg = modules.join('|')

          route.path = `/login/:module(${moduleReg})?`
        }
      },
    }),
    layouts(),
  ]
}
