import type { RouteRecordRaw, Router } from 'vue-router'
import { $t } from '@/locales'
import { getRoutePath } from '@/router/routes/builtin'

/**
 * Get all tabs
 *
 * @param tabs Tabs
 * @param homeTab Home tab
 */
export function getAllTabs(tabs: App.Global.Tab[], homeTab?: App.Global.Tab) {
  if (!homeTab) {
    return []
  }

  const filterHomeTabs = tabs.filter(tab => tab.id !== homeTab.id)

  const fixedTabs = filterHomeTabs.filter(isFixedTab).sort((a, b) => a.fixedIndex! - b.fixedIndex!)

  const remainTabs = filterHomeTabs.filter(tab => !isFixedTab(tab))

  const allTabs = [homeTab, ...fixedTabs, ...remainTabs]

  return updateTabsLabel(allTabs)
}

/**
 * Is fixed tab
 *
 * @param tab
 */
function isFixedTab(tab: App.Global.Tab) {
  return tab.fixedIndex !== undefined && tab.fixedIndex !== null
}

/**
 * Get tab id by route
 *
 * @param route
 */
export function getTabIdByRoute(route: App.Global.TabRoute) {
  const { path, query = {}, meta } = route

  let id = path

  if (meta.multiTab) {
    const queryKeys = Object.keys(query).sort()
    // encode keys and values so `&`/`=` inside a value, arrays and null values cannot collide
    const qs = queryKeys
      .flatMap(key => {
        const value = query[key]
        const values = Array.isArray(value) ? value : [value]
        const encodedKey = encodeURIComponent(key)

        return values.map(item => (item === null ? encodedKey : `${encodedKey}=${encodeURIComponent(item)}`))
      })
      .join('&')

    id = `${path}?${qs}`
  }

  return id
}

/**
 * Get tab by route
 *
 * @param route
 */
export function getTabByRoute(route: App.Global.TabRoute) {
  const { name, path, fullPath = path, meta } = route

  const { title, i18nKey, fixedIndexInTab } = meta

  // Get icon and localIcon from getRouteIcons function
  const { icon, localIcon } = getRouteIcons(route)

  const label = (i18nKey ? $t(i18nKey) : title) || ''

  const tab: App.Global.Tab = {
    id: getTabIdByRoute(route),
    label,
    routeKey: name as App.Global.RouteKey,
    routePath: path as App.Global.RoutePath,
    fullPath,
    fixedIndex: fixedIndexInTab,
    icon,
    localIcon,
    i18nKey,
  }

  return tab
}

/**
 * The vue router will automatically merge the meta of all matched items, and the icons here may be affected by other
 * matching items, so they need to be processed separately
 *
 * @param route
 */
export function getRouteIcons(route: App.Global.TabRoute) {
  // Set default value for icon at the beginning
  let icon: string = route?.meta?.icon || import.meta.env.VITE_MENU_ICON
  let localIcon: string | undefined = route?.meta?.localIcon

  // Route.matched only appears when there are multiple matches,so check if route.matched exists
  if (route.matched) {
    // Find the meta of the current route from matched
    const currentRoute = route.matched.find(r => r.name === route.name)
    // If icon exists in currentRoute.meta, it will overwrite the default value
    icon = currentRoute?.meta?.icon || icon
    localIcon = currentRoute?.meta?.localIcon
  }

  return { icon, localIcon }
}

/**
 * Get default home tab
 *
 * @param router
 * @param homeRouteName routeHome in useRouteStore
 */
export function getDefaultHomeTab(router: Router, homeRouteName: App.Global.RouteKey) {
  const homeRoutePath = getRoutePath(homeRouteName)
  const i18nLabel = $t(`route.${homeRouteName}` as App.I18n.I18nKey)

  let homeTab: App.Global.Tab = {
    id: homeRoutePath,
    label: i18nLabel || homeRouteName,
    routeKey: homeRouteName,
    routePath: homeRoutePath,
    fullPath: homeRoutePath,
  }

  const routes = router.getRoutes()
  const homeRoute = routes.find(route => route.name === homeRouteName)
  if (homeRoute) {
    homeTab = getTabByRoute(homeRoute as unknown as App.Global.TabRoute)
  }

  return homeTab
}

/**
 * Is tab in tabs
 *
 * @param tabId
 * @param tabs
 */
export function isTabInTabs(tabId: string, tabs: App.Global.Tab[]) {
  return tabs.some(tab => tab.id === tabId)
}

/**
 * Filter tabs by id
 *
 * @param tabId
 * @param tabs
 */
export function filterTabsById(tabId: string, tabs: App.Global.Tab[]) {
  return tabs.filter(tab => tab.id !== tabId)
}

/**
 * Filter tabs by ids
 *
 * @param tabIds
 * @param tabs
 */
export function filterTabsByIds(tabIds: string[], tabs: App.Global.Tab[]) {
  return tabs.filter(tab => !tabIds.includes(tab.id))
}

/**
 * Collect the names of routes and their nested children
 *
 * @param routes
 */
export function collectRouteNames(routes: RouteRecordRaw[]): string[] {
  return routes.flatMap(route => [
    ...(route.name ? [String(route.name)] : []),
    ...collectRouteNames(route.children || []),
  ])
}

/**
 * Extract tabs whose route is one of the given route names
 *
 * @param routeNames Names of the routes the current user can access
 * @param tabs
 */
export function extractTabsByRouteNames(routeNames: string[], tabs: App.Global.Tab[]) {
  return tabs.filter(tab => routeNames.includes(tab.routeKey))
}

/**
 * Insert a tab, keeping fixed tabs (ordered by fixedIndex) before the other tabs
 *
 * @param tabs
 * @param tab
 */
export function insertTab(tabs: App.Global.Tab[], tab: App.Global.Tab) {
  if (!isFixedTab(tab)) {
    tabs.push(tab)
    return
  }

  const fixedTabs = getFixedTabs(tabs)
  const index = fixedTabs.filter(t => t.fixedIndex! <= tab.fixedIndex!).length

  tabs.splice(index, 0, tab)
}

/**
 * Whether the tabs should be reset because a different user logged in
 *
 * @param lastUserId User id of the previous session
 * @param currentUserId User id of the current session
 */
export function shouldResetTabs(lastUserId: string | null | undefined, currentUserId: string) {
  return !lastUserId || lastUserId !== currentUserId
}

/**
 * Whether a known previous user differs from the current one
 *
 * Unlike `shouldResetTabs`, an unknown previous user (e.g. a first login) is not treated as different
 *
 * @param lastUserId User id of the previous session
 * @param currentUserId User id of the current session
 */
export function isDifferentUser(lastUserId: string | null | undefined, currentUserId: string) {
  return Boolean(lastUserId) && lastUserId !== currentUserId
}

/**
 * Get fixed tabs
 *
 * @param tabs
 */
export function getFixedTabs(tabs: App.Global.Tab[]) {
  return tabs.filter(isFixedTab)
}

/**
 * Get fixed tab ids
 *
 * @param tabs
 */
export function getFixedTabIds(tabs: App.Global.Tab[]) {
  const fixedTabs = getFixedTabs(tabs)

  return fixedTabs.map(tab => tab.id)
}

/**
 * Reorder fixed tabs fixedIndex
 *
 * @param tabs
 */
export function reorderFixedTabs(tabs: App.Global.Tab[]) {
  const fixedTabs = getFixedTabs(tabs)
  fixedTabs.forEach((t, i) => {
    t.fixedIndex = i
  })
}

/**
 * Update tabs label
 *
 * @param tabs
 */
function updateTabsLabel(tabs: App.Global.Tab[]) {
  const updated = tabs.map(tab => ({
    ...tab,
    label: tab.newLabel || tab.label,
  }))

  return updated
}

/**
 * Update tab by i18n key
 *
 * @param tab
 */
export function updateTabByI18nKey(tab: App.Global.Tab) {
  const { i18nKey, label } = tab

  return {
    ...tab,
    label: i18nKey ? $t(i18nKey) : label,
  }
}

/**
 * Update tabs by i18n key
 *
 * @param tabs
 */
export function updateTabsByI18nKey(tabs: App.Global.Tab[]) {
  return tabs.map(tab => updateTabByI18nKey(tab))
}

/**
 * find tab by route name
 *
 * @param name
 * @param tabs
 */
export function findTabByRouteName(name: App.Global.RouteKey, tabs: App.Global.Tab[]) {
  // match the stored route key: tab ids hold resolved paths (dynamic params, multiTab query)
  return tabs.find(tab => tab.routeKey === name)
}

/**
 * Get the tab to activate after removing several tabs, including the active one
 *
 * The nearest surviving tab on the right first, then on the left, then home
 *
 * @param tabs Tabs before removal
 * @param activeTabId Id of the active tab
 * @param removedTabIds Ids of the removed tabs
 * @param homeTab Home tab
 */
export function getNearestSurvivingTab(
  tabs: App.Global.Tab[],
  activeTabId: string,
  removedTabIds: string[],
  homeTab?: App.Global.Tab,
) {
  const activeIndex = tabs.findIndex(tab => tab.id === activeTabId)
  const isSurviving = (tab: App.Global.Tab) => !removedTabIds.includes(tab.id)

  const right = tabs.slice(activeIndex + 1).find(isSurviving)
  const left = tabs.slice(0, Math.max(activeIndex, 0)).reverse().find(isSurviving)

  return right || left || homeTab
}

/**
 * Get the tab to activate after removing a tab
 *
 * Right neighbour first, then left neighbour, then home
 *
 * @param tabs Tabs before removal
 * @param removeIndex Index of the removed tab
 * @param homeTab Home tab
 */
export function getNextActiveTab(tabs: App.Global.Tab[], removeIndex: number, homeTab?: App.Global.Tab) {
  return tabs[removeIndex + 1] || tabs[removeIndex - 1] || homeTab
}
