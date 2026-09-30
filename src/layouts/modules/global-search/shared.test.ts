import { describe, expect, it } from 'vite-plus/test'
import { filterSearchMenus, moveActiveIndex } from './shared'

// nested menus carry a relative routePath and the full path as routeKey (route name == path)
function menu(routeKey: string, title: string) {
  const routePath = routeKey.split('/').pop()

  return { key: routeKey, label: title, routeKey, routePath } as unknown as App.Global.Menu
}

const menus = [menu('/home', 'Trang chủ'), menu('/manage/user', 'Quản lý người dùng'), menu('/about', 'Giới thiệu')]
const getTitle = (item: App.Global.Menu) => item.label as string

describe('filterSearchMenus', () => {
  it('returns nothing for an empty or blank keyword', () => {
    expect(filterSearchMenus(menus, '', getTitle)).toEqual([])
    expect(filterSearchMenus(menus, '   ', getTitle)).toEqual([])
  })

  it('matches the title ignoring case and Vietnamese diacritics', () => {
    expect(filterSearchMenus(menus, 'trang chu', getTitle).map(m => m.routeKey)).toEqual(['/home'])
    expect(filterSearchMenus(menus, 'QUAN LY', getTitle).map(m => m.routeKey)).toEqual(['/manage/user'])
    expect(filterSearchMenus(menus, 'nguoi dung', getTitle).map(m => m.routeKey)).toEqual(['/manage/user'])
  })

  it('treats đ like d', () => {
    const items = [menu('/a', 'Đơn hàng')]

    expect(filterSearchMenus(items, 'don', getTitle).map(m => m.routeKey)).toEqual(['/a'])
  })

  it('also matches the route path', () => {
    expect(filterSearchMenus(menus, '/manage', getTitle).map(m => m.routeKey)).toEqual(['/manage/user'])
  })
})

describe('moveActiveIndex', () => {
  it('moves down and wraps to the first item', () => {
    expect(moveActiveIndex(0, 3, 1)).toBe(1)
    expect(moveActiveIndex(2, 3, 1)).toBe(0)
  })

  it('moves up and wraps to the last item', () => {
    expect(moveActiveIndex(1, 3, -1)).toBe(0)
    expect(moveActiveIndex(0, 3, -1)).toBe(2)
  })

  it('returns -1 when there are no results', () => {
    expect(moveActiveIndex(0, 0, 1)).toBe(-1)
  })
})
