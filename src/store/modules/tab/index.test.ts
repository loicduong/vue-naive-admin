import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { useTabStore } from './index'

const storage = new Map<string, unknown>()

const { push, pushByKey, currentRoute } = vi.hoisted(() => ({
  push: vi.fn<(...args: unknown[]) => Promise<unknown>>(async () => undefined),
  pushByKey: vi.fn<(...args: unknown[]) => Promise<unknown>>(async () => undefined),
  currentRoute: { value: { name: '/home', path: '/home', query: {}, meta: {} } as Record<string, unknown> },
}))

vi.stubGlobal('window', {})

vi.mock('@vueuse/core', () => ({ useEventListener: vi.fn() }))

vi.mock('@/locales', () => ({ $t: (key: string) => key }))

vi.mock('@/router/routes/builtin', () => ({ getRoutePath: (name: string) => name }))

vi.mock('@/router', () => ({
  router: { getRoutes: () => [{ name: '/home', path: '/home', meta: {} }], currentRoute },
}))

vi.mock('@/hooks/common/router', () => ({
  useRouterPush: () => ({ routerPush: push, routerPushByKey: pushByKey }),
}))

vi.mock('@/utils/storage', () => ({
  localStg: {
    get: (key: string) => storage.get(key) ?? null,
    set: (key: string, value: unknown) => storage.set(key, value),
    remove: (key: string) => storage.delete(key),
  },
}))

vi.mock('@/store/modules/route', () => ({
  useRouteStore: () => ({
    routeHome: '/home',
    allowedRouteNames: ['/home', '/a', '/b', '/c'],
    resetRouteCache: vi.fn(async () => undefined),
  }),
}))

vi.mock('@/store/modules/theme', () => ({
  useThemeStore: () => ({ tab: { cache: true } }),
}))

function route(path: string) {
  return { name: path, path, fullPath: path, meta: {} } as unknown as App.Global.TabRoute
}

function storedTab(id: string): App.Global.Tab {
  return { id, label: id, routeKey: id as App.Global.RouteKey, routePath: id as App.Global.RoutePath, fullPath: id }
}

describe('tab store', () => {
  beforeEach(() => {
    storage.clear()
    setActivePinia(createPinia())
  })

  it('restores tabs from storage only on the first init, not when the tab bar remounts', () => {
    storage.set('globalTabs', [storedTab('/a')])

    const tabStore = useTabStore()
    tabStore.initHomeTab()
    tabStore.initTabStore(route('/a'))
    tabStore.addTab(route('/b'))

    // tab bar unmounts (e.g. a blank-layout page) and mounts again on /c
    tabStore.initTabStore(route('/c'))

    expect(tabStore.tabs.map(t => t.id)).toEqual(['/home', '/a', '/b', '/c'])
  })

  it('updates the destination of an existing tab when its route is revisited with another query', () => {
    const tabStore = useTabStore()
    tabStore.initHomeTab()
    tabStore.initTabStore(route('/a'))

    tabStore.addTab({ ...route('/a'), fullPath: '/a?page=2' } as App.Global.TabRoute)

    expect(tabStore.tabs.find(t => t.id === '/a')?.fullPath).toBe('/a?page=2')
  })

  it('keeps the current tab when the replacement navigation fails', async () => {
    const tabStore = useTabStore()
    tabStore.initHomeTab()
    tabStore.initTabStore(route('/a'))

    pushByKey.mockResolvedValueOnce({ type: 4, from: {}, to: {} })

    await tabStore.replaceTab('/b' as App.Global.RouteKey)

    expect(tabStore.tabs.map(t => t.id)).toEqual(['/home', '/a'])
  })

  it('removes the replaced tab when the navigation succeeds', async () => {
    const tabStore = useTabStore()
    tabStore.initHomeTab()
    tabStore.initTabStore(route('/a'))

    pushByKey.mockImplementationOnce(async () => {
      tabStore.addTab(route('/b'))
    })

    await tabStore.replaceTab('/b' as App.Global.RouteKey)

    expect(tabStore.tabs.map(t => t.id)).toEqual(['/home', '/b'])
  })

  it('keeps the active tab when navigating away from it is cancelled', async () => {
    const tabStore = useTabStore()
    tabStore.initHomeTab()
    tabStore.initTabStore(route('/a'))
    tabStore.addTab(route('/b'))

    push.mockResolvedValueOnce({ type: 4, from: {}, to: {} })

    await tabStore.removeTab('/b')

    expect(tabStore.tabs.map(t => t.id)).toEqual(['/home', '/a', '/b'])
    expect(tabStore.activeTabId).toBe('/b')
  })

  it('keeps all tabs when a bulk close cannot leave the active tab', async () => {
    const tabStore = useTabStore()
    tabStore.initHomeTab()
    tabStore.initTabStore(route('/a'))
    tabStore.addTab(route('/b'))

    push.mockResolvedValueOnce({ type: 4, from: {}, to: {} })

    await tabStore.clearTabs()

    expect(tabStore.tabs.map(t => t.id)).toEqual(['/home', '/a', '/b'])
  })

  it('keeps the tab when replaceTab lands on the same tab id', async () => {
    const tabStore = useTabStore()
    tabStore.initHomeTab()
    tabStore.initTabStore(route('/a'))

    pushByKey.mockImplementationOnce(async () => {
      currentRoute.value = { name: '/a', path: '/a', fullPath: '/a?page=2', query: { page: '2' }, meta: {} }
      tabStore.addTab({ ...route('/a'), fullPath: '/a?page=2' } as App.Global.TabRoute)
    })

    await tabStore.replaceTab('/a' as App.Global.RouteKey, { query: { page: '2' } })

    expect(tabStore.tabs.map(t => t.id)).toEqual(['/home', '/a'])
  })

  it('resetTabs drops every tab, including pinned ones, and the stored snapshot', () => {
    storage.set('globalTabs', [storedTab('/a')])

    const tabStore = useTabStore()
    tabStore.initHomeTab()
    tabStore.initTabStore(route('/a'))
    tabStore.addTab(route('/b'))
    tabStore.fixTab('/b')

    tabStore.resetTabs()

    expect(tabStore.tabs.map(t => t.id)).toEqual(['/home'])
    expect(storage.has('globalTabs')).toBe(false)

    tabStore.initTabStore(route('/c'))

    expect(tabStore.tabs.map(t => t.id)).toEqual(['/home', '/c'])
  })
})
