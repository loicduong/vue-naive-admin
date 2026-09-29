import type { RouteRecordRaw } from 'vue-router'
import { describe, expect, it, vi } from 'vite-plus/test'
import {
  collectRouteNames,
  extractTabsByRouteNames,
  findTabByRouteName,
  getAllTabs,
  getFixedTabIds,
  getNextActiveTab,
  getTabIdByRoute,
  insertTab,
  reorderFixedTabs,
  shouldResetTabs,
  updateTabsByI18nKey,
} from './shared'

let locale = 'en'

vi.mock('@/locales', () => ({
  $t: (key: string) => `${locale}:${key}`,
}))

vi.mock('@/router/routes/builtin', () => ({
  getRoutePath: (name: string) => name,
}))

function tab(id: string, extra: Partial<App.Global.Tab> = {}): App.Global.Tab {
  return {
    id,
    label: id,
    routeKey: id as App.Global.RouteKey,
    routePath: id as App.Global.RoutePath,
    fullPath: id,
    ...extra,
  }
}

function route(path: string, meta: Record<string, unknown> = {}, query: Record<string, string> = {}) {
  return { name: path, path, meta, query } as unknown as App.Global.TabRoute
}

describe('getTabIdByRoute', () => {
  it('uses the path for a normal route', () => {
    expect(getTabIdByRoute(route('/about', {}, { a: '1' }))).toBe('/about')
  })

  it('uses path + sorted query for a multiTab route', () => {
    const a = getTabIdByRoute(route('/function/multi-tab', { multiTab: true }, { b: '2', a: '1' }))
    const b = getTabIdByRoute(route('/function/multi-tab', { multiTab: true }, { a: '1', b: '2' }))

    expect(a).toBe('/function/multi-tab?a=1&b=2')
    expect(b).toBe(a)
  })

  it('keeps a trailing ? for a multiTab route without query', () => {
    expect(getTabIdByRoute(route('/function/multi-tab', { multiTab: true }))).toBe('/function/multi-tab?')
  })
})

describe('getAllTabs', () => {
  const home = tab('/home')

  it('returns nothing without a home tab', () => {
    expect(getAllTabs([tab('/a')])).toEqual([])
  })

  it('orders home, fixed by fixedIndex, then the rest, without duplicating home', () => {
    const tabs = [tab('/a'), tab('/home'), tab('/c', { fixedIndex: 1 }), tab('/b', { fixedIndex: 0 })]

    expect(getAllTabs(tabs, home).map(t => t.id)).toEqual(['/home', '/b', '/c', '/a'])
  })

  it('prefers newLabel over label', () => {
    const [, renamed] = getAllTabs([tab('/a', { newLabel: 'Custom' })], home)

    expect(renamed.label).toBe('Custom')
  })
})

describe('fixed tabs', () => {
  it('lists fixed tab ids', () => {
    expect(getFixedTabIds([tab('/a'), tab('/b', { fixedIndex: 0 })])).toEqual(['/b'])
  })

  it('reorders fixed indexes contiguously from 0 after an unpin', () => {
    const tabs = [tab('/a', { fixedIndex: 0 }), tab('/b', { fixedIndex: undefined }), tab('/c', { fixedIndex: 2 })]

    reorderFixedTabs(tabs)

    expect(tabs.map(t => t.fixedIndex)).toEqual([0, undefined, 1])
  })
})

describe('extractTabsByRouteNames', () => {
  it('drops tabs whose route no longer exists', () => {
    const tabs = [tab('/a'), tab('/gone')]

    expect(extractTabsByRouteNames(['/a'], tabs).map(t => t.id)).toEqual(['/a'])
  })

  it('drops tabs whose route is registered but not allowed for the current user', () => {
    const allowed = collectRouteNames([
      { name: '/home', path: '/home' },
      { name: '/function', path: '/function', children: [{ name: '/function/tab', path: 'tab' }] },
    ] as RouteRecordRaw[])

    const tabs = [tab('/function/tab'), tab('/manage/user')]

    expect(extractTabsByRouteNames(allowed, tabs).map(t => t.id)).toEqual(['/function/tab'])
  })
})

describe('label after rename and reset', () => {
  it('follows the current locale once a custom label is reset', () => {
    const renamedThenReset = tab('/a', {
      i18nKey: 'route./a' as App.I18n.I18nKey,
      label: 'en:route./a',
      oldLabel: 'en:route./a',
      newLabel: undefined,
    })

    locale = 'vi'
    const [, shown] = getAllTabs(updateTabsByI18nKey([renamedThenReset]), tab('/home'))
    locale = 'en'

    expect(shown.label).toBe('vi:route./a')
  })
})

describe('insertTab', () => {
  it('puts a meta-fixed tab into the fixed block, so neighbours follow display order', () => {
    const tabs: App.Global.Tab[] = []

    insertTab(tabs, tab('/a'))
    insertTab(tabs, tab('/b'))
    insertTab(tabs, tab('/m', { fixedIndex: 0 }))

    expect(tabs.map(t => t.id)).toEqual(['/m', '/a', '/b'])
    expect(getAllTabs(tabs, tab('/home')).map(t => t.id)).toEqual(['/home', '/m', '/a', '/b'])
    expect(
      getNextActiveTab(
        tabs,
        tabs.findIndex(t => t.id === '/b'),
        tab('/home'),
      )?.id,
    ).toBe('/a')
  })

  it('orders several meta-fixed tabs by their fixed index', () => {
    const tabs: App.Global.Tab[] = []

    insertTab(tabs, tab('/y', { fixedIndex: 1 }))
    insertTab(tabs, tab('/x', { fixedIndex: 0 }))

    expect(tabs.map(t => [t.id, t.fixedIndex])).toEqual([
      ['/x', 0],
      ['/y', 1],
    ])
  })
})

describe('shouldResetTabs', () => {
  it('resets when another user logs in', () => {
    expect(shouldResetTabs('1', '2')).toBe(true)
  })

  it('resets when no previous user was recorded', () => {
    expect(shouldResetTabs(null, '2')).toBe(true)
  })

  it('keeps tabs for the same user', () => {
    expect(shouldResetTabs('2', '2')).toBe(false)
  })
})

describe('updateTabsByI18nKey', () => {
  it('re-translates tabs that have an i18n key and leaves the others', () => {
    locale = 'vi'

    const tabs = [tab('/a', { i18nKey: 'route./a' as App.I18n.I18nKey }), tab('/b')]

    expect(updateTabsByI18nKey(tabs).map(t => t.label)).toEqual(['vi:route./a', '/b'])

    locale = 'en'
  })

  it('keeps a custom label after a locale switch', () => {
    const tabs = updateTabsByI18nKey([tab('/a', { i18nKey: 'route./a' as App.I18n.I18nKey, newLabel: 'Mine' })])

    expect(getAllTabs(tabs, tab('/home'))[1].label).toBe('Mine')
  })
})

describe('findTabByRouteName', () => {
  it('finds a plain tab and a multiTab variant', () => {
    const tabs = [tab('/about'), tab('/function/multi-tab?a=1')]

    expect(findTabByRouteName('/about' as App.Global.RouteKey, tabs)?.id).toBe('/about')
    expect(findTabByRouteName('/function/multi-tab' as App.Global.RouteKey, tabs)?.id).toBe('/function/multi-tab?a=1')
  })
})

describe('getNextActiveTab', () => {
  const home = tab('/home')

  it('prefers the right neighbour', () => {
    expect(getNextActiveTab([tab('/a'), tab('/b'), tab('/c')], 1, home)?.id).toBe('/c')
  })

  it('falls back to the left neighbour when removing the last tab', () => {
    expect(getNextActiveTab([tab('/a'), tab('/b')], 1, home)?.id).toBe('/a')
  })

  it('falls back to home when it was the only tab', () => {
    expect(getNextActiveTab([tab('/a')], 0, home)?.id).toBe('/home')
  })
})
