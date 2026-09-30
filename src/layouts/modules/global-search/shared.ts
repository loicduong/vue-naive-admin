/**
 * Normalize text for searching: lower case, without diacritics (so "trang chu" matches "Trang chủ")
 *
 * @param text
 */
function normalizeSearchText(text: string) {
  return text.normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim()
}

/**
 * Filter menus by keyword, matching the menu title or the full route path
 *
 * @param menus Searchable menus
 * @param keyword Search keyword
 * @param getTitle Get the displayed (translated) title of a menu
 */
export function filterSearchMenus(
  menus: App.Global.Menu[],
  keyword: string,
  getTitle: (menu: App.Global.Menu) => string,
) {
  const normalizedKeyword = normalizeSearchText(keyword)
  if (!normalizedKeyword) return []

  return menus.filter(menu => {
    const title = normalizeSearchText(getTitle(menu))
    // routeKey is the full path (routePath is relative for nested menus)
    const path = normalizeSearchText(menu.routeKey)

    return title.includes(normalizedKeyword) || path.includes(normalizedKeyword)
  })
}

/**
 * Move the active result index up or down, wrapping around
 *
 * @param index Current index
 * @param length Number of results
 * @param step 1 to move down, -1 to move up
 * @returns The new index, or -1 when there are no results
 */
export function moveActiveIndex(index: number, length: number, step: 1 | -1) {
  if (length === 0) return -1

  return (index + step + length) % length
}

/** What a key press does in the search */
export type SearchKeyAction = 'up' | 'down' | 'select' | 'close'

/**
 * Map a key press to a search action
 *
 * Keys pressed while an IME composition is active belong to the input method (Enter confirms, Esc cancels the
 * composition), so they are ignored
 *
 * @param event
 */
export function getSearchKeyAction(event: Pick<KeyboardEvent, 'key' | 'isComposing'>): SearchKeyAction | null {
  if (event.isComposing) return null

  const actions: Record<string, SearchKeyAction> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    Enter: 'select',
    Escape: 'close',
  }

  return actions[event.key] ?? null
}
