import { useEventListener } from '@vueuse/core'
import { defineStore } from 'pinia'
import { SetupStoreId } from '@/constants/enum'
import { useRouterPush } from '@/hooks/common/router'
import { router } from '@/router'
import { useRouteStore } from '@/store/modules/route'
import { localStg } from '@/utils/storage'
import { useThemeStore } from '../theme'
import {
  extractTabsByRouteNames,
  filterTabsByIds,
  findTabByRouteName,
  getAllTabs,
  getDefaultHomeTab,
  getFixedTabIds,
  getNextActiveTab,
  getTabByRoute,
  getTabIdByRoute,
  insertTab,
  isTabInTabs,
  reorderFixedTabs,
  updateTabByI18nKey,
  updateTabsByI18nKey,
} from './shared'

export const useTabStore = defineStore(SetupStoreId.Tab, () => {
  const routeStore = useRouteStore()
  const themeStore = useThemeStore()
  const { routerPush, routerPushByKey } = useRouterPush(false)

  /** Tabs */
  const tabs = ref<App.Global.Tab[]>([])

  /** Get active tab */
  const homeTab = ref<App.Global.Tab>()

  /** Init home tab */
  function initHomeTab() {
    homeTab.value = getDefaultHomeTab(router, routeStore.routeHome)
  }

  /** Get all tabs */
  const allTabs = computed(() => getAllTabs(tabs.value, homeTab.value))

  /** Active tab id */
  const activeTabId = ref<string>('')

  /**
   * Set active tab id
   *
   * @param id Tab id
   */
  function setActiveTabId(id: string) {
    activeTabId.value = id
  }

  /** Whether the tabs have been restored from storage in this session */
  let isTabStoreInitialized = false

  /**
   * Init tab store
   *
   * @param currentRoute Current route
   */
  function initTabStore(currentRoute: App.Global.TabRoute) {
    const storageTabs = localStg.get('globalTabs')

    // restore from storage only once per session, the tab bar may remount (e.g. after a blank-layout page)
    if (!isTabStoreInitialized && themeStore.tab.cache && storageTabs) {
      const extractedTabs = extractTabsByRouteNames(routeStore.allowedRouteNames, storageTabs)
      tabs.value = updateTabsByI18nKey(extractedTabs)
    }

    isTabStoreInitialized = true

    addTab(currentRoute)
  }

  /** Reset all tabs, including fixed ones, and the cached tabs */
  function resetTabs() {
    tabs.value = []
    activeTabId.value = ''
    isTabStoreInitialized = false

    localStg.remove('globalTabs')
  }

  /**
   * Add tab
   *
   * @param route Tab route
   * @param active Whether to activate the added tab
   */
  function addTab(route: App.Global.TabRoute, active = true) {
    const tab = getTabByRoute(route)

    const isHomeTab = tab.id === homeTab.value?.id

    if (!isHomeTab && !isTabInTabs(tab.id, tabs.value)) {
      insertTab(tabs.value, tab)
    }

    if (active) {
      setActiveTabId(tab.id)
    }
  }

  /**
   * Remove tab
   *
   * @param tabId Tab id
   */
  async function removeTab(tabId: string) {
    const removeTabIndex = tabs.value.findIndex(tab => tab.id === tabId)
    if (removeTabIndex === -1) return

    const removedTabRouteKey = tabs.value[removeTabIndex].routeKey
    const isRemoveActiveTab = activeTabId.value === tabId

    const nextTab = getNextActiveTab(tabs.value, removeTabIndex, homeTab.value)

    tabs.value.splice(removeTabIndex, 1)

    if (isRemoveActiveTab && nextTab) {
      await switchRouteByTab(nextTab)
    }

    await routeStore.resetRouteCache(removedTabRouteKey)
  }

  /** remove active tab */
  async function removeActiveTab() {
    await removeTab(activeTabId.value)
  }

  /**
   * remove tab by route name
   *
   * @param routeName route name
   */
  async function removeTabByRouteName(routeName: App.Global.RouteKey) {
    const tab = findTabByRouteName(routeName, tabs.value)
    if (!tab) return

    await removeTab(tab.id)
  }

  /**
   * Clear tabs
   *
   * @param excludes Exclude tab ids
   */
  async function clearTabs(excludes: string[] = []) {
    const remainTabIds = [...getFixedTabIds(tabs.value), ...excludes]

    const tabsToRemove = tabs.value.filter(tab => !remainTabIds.includes(tab.id))
    if (!tabsToRemove.length) return

    const removedTabsIds = tabsToRemove.map(tab => tab.id)
    const routeKeysToReset = tabsToRemove.map(tab => tab.routeKey)

    const isRemoveActiveTab = removedTabsIds.includes(activeTabId.value)
    const updatedTabs = filterTabsByIds(removedTabsIds, tabs.value)

    if (isRemoveActiveTab) {
      const activeTabCandidate = updatedTabs[updatedTabs.length - 1] || homeTab.value

      if (activeTabCandidate) {
        await switchRouteByTab(activeTabCandidate)
      }
    }

    tabs.value = updatedTabs

    for (const routeKey of routeKeysToReset) {
      await routeStore.resetRouteCache(routeKey)
    }
  }

  /**
   * Replace tab
   *
   * @param key Route key
   * @param options Router push options
   */
  async function replaceTab(key: App.Global.RouteKey, options?: App.Global.RouterPushOptions) {
    const oldTabId = activeTabId.value

    // push new route
    await routerPushByKey(key, options)

    // remove old tab (exclude fixed tab)
    if (!isTabRetain(oldTabId)) {
      await removeTab(oldTabId)
    }
  }

  /**
   * Switch route by tab
   *
   * @param tab
   */
  async function switchRouteByTab(tab: App.Global.Tab) {
    const fail = await routerPush(tab.fullPath)
    if (!fail) {
      setActiveTabId(tab.id)
    }
  }

  /**
   * Clear left tabs
   *
   * @param tabId
   */
  async function clearLeftTabs(tabId: string) {
    const tabIds = tabs.value.map(tab => tab.id)
    const index = tabIds.indexOf(tabId)
    if (index === -1) return

    const excludes = tabIds.slice(index)
    await clearTabs(excludes)
  }

  /**
   * Clear right tabs
   *
   * @param tabId
   */
  async function clearRightTabs(tabId: string) {
    const isHomeTab = tabId === homeTab.value?.id
    if (isHomeTab) {
      await clearTabs()
      return
    }

    const tabIds = tabs.value.map(tab => tab.id)
    const index = tabIds.indexOf(tabId)
    if (index === -1) return

    const excludes = tabIds.slice(0, index + 1)
    await clearTabs(excludes)
  }

  /**
   * Fix tab
   *
   * @param tabId
   */
  function fixTab(tabId: string) {
    const tabIndex = tabs.value.findIndex(t => t.id === tabId)
    if (tabIndex === -1) return

    const tab = tabs.value[tabIndex]
    const fixedCount = getFixedTabIds(tabs.value).length
    tab.fixedIndex = fixedCount

    if (tabIndex !== fixedCount) {
      tabs.value.splice(tabIndex, 1)
      tabs.value.splice(fixedCount, 0, tab)
    }

    reorderFixedTabs(tabs.value)
  }

  /**
   * Unfix tab
   *
   * @param tabId
   */
  function unfixTab(tabId: string) {
    const tabIndex = tabs.value.findIndex(t => t.id === tabId)
    if (tabIndex === -1) return

    const tab = tabs.value[tabIndex]
    tab.fixedIndex = undefined

    const fixedCount = getFixedTabIds(tabs.value).length

    if (tabIndex !== fixedCount) {
      tabs.value.splice(tabIndex, 1)
      tabs.value.splice(fixedCount, 0, tab)
    }

    reorderFixedTabs(tabs.value)
  }

  /**
   * Set new label of tab
   *
   * @default activeTabId
   * @param label New tab label
   * @param tabId Tab id
   */
  function setTabLabel(label: string, tabId?: string) {
    const id = tabId || activeTabId.value

    const tab = tabs.value.find(item => item.id === id)
    if (!tab) return

    tab.oldLabel = tab.label
    tab.newLabel = label
  }

  /**
   * Reset tab label
   *
   * @default activeTabId
   * @param tabId Tab id
   */
  function resetTabLabel(tabId?: string) {
    const id = tabId || activeTabId.value

    const tab = tabs.value.find(item => item.id === id)
    if (!tab) return

    tab.newLabel = undefined
  }

  /**
   * Is tab retain
   *
   * @param tabId
   */
  function isTabRetain(tabId: string) {
    if (tabId === homeTab.value?.id) return true

    const fixedTabIds = getFixedTabIds(tabs.value)

    return fixedTabIds.includes(tabId)
  }

  /** Update tabs by locale */
  function updateTabsByLocale() {
    tabs.value = updateTabsByI18nKey(tabs.value)

    if (homeTab.value) {
      homeTab.value = updateTabByI18nKey(homeTab.value)
    }
  }

  /** Cache tabs */
  function cacheTabs() {
    if (!themeStore.tab.cache) return

    localStg.set('globalTabs', tabs.value)
  }

  // cache tabs when page is closed or refreshed
  useEventListener(window, 'beforeunload', () => {
    cacheTabs()
  })

  return {
    /** All tabs */
    tabs: allTabs,
    activeTabId,
    homeTab,
    initHomeTab,
    initTabStore,
    addTab,
    removeTab,
    removeActiveTab,
    removeTabByRouteName,
    replaceTab,
    clearTabs,
    clearLeftTabs,
    clearRightTabs,
    fixTab,
    unfixTab,
    switchRouteByTab,
    setTabLabel,
    resetTabLabel,
    isTabRetain,
    updateTabsByLocale,
    getTabIdByRoute,
    cacheTabs,
    resetTabs,
  }
})
