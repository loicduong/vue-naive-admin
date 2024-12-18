import type { RouteRecordRaw } from 'vue-router'
import { SetupStoreId } from '@/constants/enum'
import { router } from '@/router'
import { createStaticRoutes } from '@/router/routes'
import { getRouteName } from '@/router/routes/builtin'
import { useBoolean } from '@sa/hooks'
import { defineStore } from 'pinia'
import { useAuthStore } from '../auth'
import { useTabStore } from '../tab'
import {
  filterAuthRoutesByRoles,
  getBreadcrumbsByRoute,
  getCacheRouteNames,
  getGlobalMenusByAuthRoutes,
  getSelectedMenuKeyPathByKey,
  isRouteExistByRouteName,
  sortRoutesByOrder,
  transformMenuToSearchMenus,
  updateLocaleOfGlobalMenus,
} from './shared'

export const useRouteStore = defineStore(SetupStoreId.Route, () => {
  const authStore = useAuthStore()
  const tabStore = useTabStore()
  const { bool: isInitConstantRoute, setBool: setIsInitConstantRoute } = useBoolean()
  const { bool: isInitAuthRoute, setBool: setIsInitAuthRoute } = useBoolean()

  /** Home route key */
  const routeHome = computed(() => getRouteName(import.meta.env.VITE_ROUTE_HOME))

  /** constant routes */
  const constantRoutes = shallowRef<RouteRecordRaw[]>([])

  function addConstantRoutes(routes: RouteRecordRaw[]) {
    const constantRoutesMap = new Map<string, RouteRecordRaw>([])

    routes.forEach((route) => {
      constantRoutesMap.set(route.name as string, route)
    })

    constantRoutes.value = Array.from(constantRoutesMap.values())
  }

  /** auth routes */
  const authRoutes = shallowRef<RouteRecordRaw[]>([])

  function addAuthRoutes(routes: RouteRecordRaw[]) {
    const authRoutesMap = new Map<string, RouteRecordRaw>([])

    routes.forEach((route) => {
      authRoutesMap.set(route.name as string, route)
    })

    authRoutes.value = Array.from(authRoutesMap.values())
  }

  /** Global menus */
  const menus = ref<App.Global.Menu[]>([])
  const searchMenus = computed(() => transformMenuToSearchMenus(menus.value))

  /** Get global menus */
  function getGlobalMenus(routes: RouteRecordRaw[]) {
    menus.value = getGlobalMenusByAuthRoutes(routes)
  }

  /** Update global menus by locale */
  function updateGlobalMenusByLocale() {
    menus.value = updateLocaleOfGlobalMenus(menus.value)
  }

  /** Cache routes */
  const cacheRoutes = ref<App.Global.RouteKey[]>([])

  /**
   * Exclude cache routes
   *
   * for reset route cache
   */
  const excludeCacheRoutes = ref<App.Global.RouteKey[]>([])

  /**
   * Get cache routes
   *
   * @param routes Vue routes
   */
  function getCacheRoutes(routes: RouteRecordRaw[]) {
    cacheRoutes.value = getCacheRouteNames(routes)
  }

  /**
   * Reset route cache
   *
   * @default
   * @param routeKey
   */
  async function resetRouteCache(routeKey?: App.Global.RouteKey) {
    const routeName = routeKey || (router.currentRoute.value.name as App.Global.RouteKey)

    excludeCacheRoutes.value.push(routeName)

    await nextTick()

    excludeCacheRoutes.value = []
  }

  /** Global breadcrumbs */
  const breadcrumbs = computed(() => getBreadcrumbsByRoute(router.currentRoute.value, menus.value))

  /** Reset store */
  async function resetStore() {
    const routeStore = useRouteStore()

    routeStore.$reset()

    // after reset store, need to re-init constant route
    await initConstantRoute()
  }

  /** init constant route */
  async function initConstantRoute() {
    if (isInitConstantRoute.value)
      return

    const staticRoute = createStaticRoutes()

    addConstantRoutes(staticRoute.constantRoutes)

    handleConstantAndAuthRoutes()

    setIsInitConstantRoute(true)

    tabStore.initHomeTab()
  }

  /** Init auth route */
  async function initAuthRoute() {
    initStaticAuthRoute()

    tabStore.initHomeTab()
  }

  /** Init static auth route */
  function initStaticAuthRoute() {
    const { authRoutes: staticAuthRoutes } = createStaticRoutes()

    if (authStore.isStaticSuper) {
      addAuthRoutes(staticAuthRoutes)
    }
    else {
      const filteredAuthRoutes = filterAuthRoutesByRoles(staticAuthRoutes, authStore.userInfo.roles)

      addAuthRoutes(filteredAuthRoutes)
    }

    handleConstantAndAuthRoutes()

    setIsInitAuthRoute(true)
  }

  /** handle constant and auth routes */
  function handleConstantAndAuthRoutes() {
    const allRoutes = [...constantRoutes.value, ...authRoutes.value]

    const sortRoutes = sortRoutesByOrder(allRoutes)

    getGlobalMenus(sortRoutes)

    getCacheRoutes(sortRoutes)
  }

  /**
   * Get is auth route exist
   *
   * @param routePath Route path
   */
  async function getIsAuthRouteExist(routePath: App.Global.RoutePath) {
    const routeName = getRouteName(routePath)

    if (!routeName) {
      return false
    }

    const { authRoutes: staticAuthRoutes } = createStaticRoutes()
    return isRouteExistByRouteName(routeName as App.Global.RouteKey, staticAuthRoutes)
  }

  /**
   * Get selected menu key path
   *
   * @param selectedKey Selected menu key
   */
  function getSelectedMenuKeyPath(selectedKey: string) {
    return getSelectedMenuKeyPathByKey(selectedKey, menus.value)
  }

  async function onRouteSwitchWhenLoggedIn() {
    await authStore.initUserInfo()
  }
  async function onRouteSwitchWhenNotLoggedIn() {
    // some global init logic if it does not need to be logged in
  }

  return {
    breadcrumbs,
    cacheRoutes,
    excludeCacheRoutes,
    isInitAuthRoute,
    isInitConstantRoute,
    menus,
    routeHome,
    searchMenus,
    getIsAuthRouteExist,
    getSelectedMenuKeyPath,
    initAuthRoute,
    initConstantRoute,
    onRouteSwitchWhenLoggedIn,
    onRouteSwitchWhenNotLoggedIn,
    resetRouteCache,
    resetStore,
    setIsInitAuthRoute,
    updateGlobalMenusByLocale,
  }
})
