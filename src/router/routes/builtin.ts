import { router } from '@/router'

/**
 * get route path by route name
 * @param name route name
 */
export function getRoutePath(name: App.Global.RouteKey) {
  const routes = router.getRoutes()

  return routes.find(x => x.name === name)?.path as App.Global.RoutePath
}

/**
 * get route name by route path
 * @param path route path
 */
export function getRouteName(path: App.Global.RoutePath) {
  const routes = router.getRoutes()

  return routes.filter(item => item.name).find(item => item.path === path)?.name
}
