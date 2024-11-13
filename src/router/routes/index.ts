import type { RouteRecordRaw } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

/** create routes when the auth route mode is static */
export function createStaticRoutes() {
  const constantRoutes: RouteRecordRaw[] = []

  const authRoutes: RouteRecordRaw[] = []

  const builtinRoutes: App.Global.RouteKey[] = ['/', '/[...all]']

  const generatedRoutes = routes.filter((item) => {
    return !builtinRoutes.includes(item.name as App.Global.RouteKey)
  })

  generatedRoutes.forEach((item) => {
    if (item.meta?.constant) {
      constantRoutes.push(item)
    }
    else {
      authRoutes.push(item)
    }
  })

  return {
    constantRoutes,
    authRoutes,
  }
}
