# Multi-tab bar — Design

- Date: 2026-09-30
- Status: Approved in chat, pending spec review

## Goal

Add a multi-page tab bar (open pages as tabs, switch, close, pin, persist) to the admin layout.

## Background

- The repo had a tab bar until commit `982cf6f` ("feat: remove tab components", 2025-03-22). It was removed to keep the template lean, not because of bugs.
- This time the feature is ported from the current upstream soybean-admin (`soybeanjs/soybean-admin@d8e680d`, 2026-09-08), which adds: a `slider` tab mode, pin/unpin from the context menu, close-by-middle-click, KeepAlive cache reset on close, closing the last tab activates the left neighbour, and caching tabs on `beforeunload`.
- The user asked for the full upstream feature set, including the programmatic API, `multiTab` and the demo pages.

## Scope

In scope:

1. Tab modes: `chrome`, `button`, `slider`, selectable in the theme drawer.
2. Context menu: reload, close current, close others, close left, close right, close all, pin/unpin.
3. Home tab always first. Routes with `meta.fixedIndexInTab` and pinned tabs are fixed after Home.
4. Persist tabs to localStorage (setting `tab.cache`), including pinned state.
5. Optional close-by-middle-click (setting `tab.closeTabByMiddleClick`).
6. Tab labels follow the current locale (`i18nKey`), except labels overridden with `setTabLabel`.
7. Horizontal scrolling (wheel on PC, drag on mobile) and auto-scroll to the active tab.
8. Reload button and full-content toggle on the right of the tab bar.
9. Store API: `addTab`, `removeTab`, `removeActiveTab`, `removeTabByRouteName`, `clearTabs`, `clearLeftTabs`, `clearRightTabs`, `replaceTab`, `switchRouteByTab`, `fixTab`, `unfixTab`, `setTabLabel`, `resetTabLabel`, `isTabRetain`, `updateTabsByLocale`, `cacheTabs`, `getTabIdByRoute`, `initHomeTab`, `initTabStore`.
10. Route meta `multiTab`: same path with different query opens separate tabs.
11. Demo pages `function/tab` and `function/multi-tab` (restored from `982cf6f^`, since upstream dropped them).

Out of scope: drag-to-reorder tabs, tab bar in any layout other than `default.vue`.

## File layout

| File                                                                       | Change                                                                                                                                                                                                                                              |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/store/modules/tab/index.ts`, `shared.ts`                              | New. Ported from upstream. `@elegant-router` types replaced by `App.Global.RouteKey` / `App.Global.RoutePath`; `getRoutePath` from `src/router/routes/builtin.ts`.                                                                                  |
| `src/store/modules/tab/shared.test.ts`                                     | New. Unit tests for the pure helpers.                                                                                                                                                                                                               |
| `src/layouts/modules/global-tab/index.vue`, `context-menu.vue`             | New. Tab bar and context menu.                                                                                                                                                                                                                      |
| `src/layouts/modules/global-tab/page-tab/`                                 | New. `index.vue`, `chrome-tab.vue`, `chrome-tab-bg.vue`, `button-tab.vue`, `slider-tab.vue`, `svg-close.vue`, `shared.ts`, `types.ts`, `index.module.css` (+ `.d.ts`). Upstream keeps these in `packages/materials`, which this repo no longer has. |
| `src/layouts/modules/admin-layout/*`                                       | Add `#tab` slot, `tabVisible` / `tabHeight` / `tabClass` props, tab CSS vars and the tab placeholder used when the header is fixed.                                                                                                                 |
| `src/layouts/modules/theme-drawer/modules/layout/modules/tab-settings.vue` | New. Visible, cache, height, mode, close-by-middle-click. Registered in the layout section of the drawer.                                                                                                                                           |
| `src/components/common/full-screen.vue`                                    | New. Full-content toggle button used by the tab bar.                                                                                                                                                                                                |
| `src/layouts/default.vue`                                                  | Render `GlobalTab` in the `#tab` slot and pass tab props.                                                                                                                                                                                           |
| `src/layouts/modules/global-content/index.vue`                             | `:key` becomes `tabStore.getTabIdByRoute(route)`.                                                                                                                                                                                                   |
| `src/store/modules/route/index.ts`                                         | Call `tabStore.initHomeTab()` after routes are initialised.                                                                                                                                                                                         |
| `src/store/modules/app/index.ts`                                           | Call `tabStore.updateTabsByLocale()` on locale change.                                                                                                                                                                                              |
| `src/store/modules/auth/index.ts`                                          | Call `tabStore.cacheTabs()` on logout.                                                                                                                                                                                                              |
| `src/theme/settings.ts`, `src/theme/vars.ts`                               | Add `tab` settings (`visible: true`, `cache: true`, `height: 44`, `mode: 'chrome'`, `closeTabByMiddleClick: false`) and the `tab` box-shadow token.                                                                                                 |
| `src/types/app.d.ts`                                                       | `ThemeSetting.tab`, `Global.Tab`, `Global.TabRoute`, `Global.DropdownKey` (+ `pin`/`unpin`), i18n schema keys.                                                                                                                                      |
| `src/types/router.d.ts`                                                    | `multiTab`, `fixedIndexInTab` meta.                                                                                                                                                                                                                 |
| `src/types/storage.d.ts`                                                   | `globalTabs: App.Global.Tab[]`.                                                                                                                                                                                                                     |
| `src/types/union-key.d.ts`                                                 | `ThemeTabMode = 'chrome' \| 'button' \| 'slider'`.                                                                                                                                                                                                  |
| `src/constants/app.ts`                                                     | `themeTabModeRecord` / `themeTabModeOptions`, `GLOBAL_TAB_WHEEL_SPEED_RATIO`.                                                                                                                                                                       |
| `src/constants/enum.ts`                                                    | `SetupStoreId.Tab`.                                                                                                                                                                                                                                 |
| `src/locales/langs/en-us.ts`, `vi-vn.ts`                                   | `theme.tab.*`, `dropdown.pin/unpin`, `icon.fullscreen/fullscreenExit`, `route./function/tab`, `route./function/multi-tab`, `page.function.tab.*`, `page.function.multiTab.*`.                                                                       |
| `src/pages/function/tab.vue`, `multi-tab.vue`                              | New demo pages.                                                                                                                                                                                                                                     |

The theme setting key `fixedHeader` is kept (avoids invalidating users' stored settings); only its label changes to "Fixed header and tab" / "Cố định header và tab", and it now also fixes the tab bar.

## Behaviour

### Initialisation

- After routes are initialised, the route store calls `initHomeTab()`. The Home tab is built from `VITE_ROUTE_HOME`.
- When `GlobalTab` mounts it calls `initTabStore(route)`: if `tab.cache` is on and `globalTabs` exists in localStorage, stored tabs are restored, dropping any whose route no longer exists; then the current route is added.

### Open / switch

- On every route change `addTab(route)` runs. Tab id is `route.path`; for `meta.multiTab` it is `path?` + query keys sorted alphabetically.
- Clicking a tab calls `switchRouteByTab()`: `router.push(fullPath)`, then sets the active tab on success.

### Close

- Closing the active tab activates the right neighbour, else the left neighbour, else Home.
- After closing, `routeStore.resetRouteCache(routeKey)` evicts the KeepAlive cache, so reopening re-mounts the page.
- Close others / left / right / all go through `clearTabs(excludes)`. Home and pinned tabs are always kept.

### Pin

- `fixTab` sets `fixedIndex` to the current fixed count and moves the tab into the fixed block; `unfixTab` clears it. `reorderFixedTabs` keeps fixed indexes contiguous from 0.
- `isTabRetain(id)` is true for Home and fixed tabs; retained tabs are not closable.

### Reload / content key

- "Reload" calls the existing `appStore.reloadPage()`.
- `global-content` keys components by tab id so `multiTab` tabs keep separate instances.

### Persistence and locale

- `cacheTabs()` writes to `localStg.globalTabs` on `beforeunload` and on logout, only when `tab.cache` is on.
- `updateTabsByLocale()` re-translates labels from `i18nKey`; tabs with `newLabel` (set via `setTabLabel`) keep it.

### UI

- Scrolling uses the existing `BetterScroll` component. Wheel scroll on PC, scaled by `GLOBAL_TAB_WHEEL_SPEED_RATIO`; drag on mobile.
- The active tab is scrolled to the centre after it changes.
- Right-click opens the context menu; middle-click closes the tab when enabled.
- The tab bar is hidden when `tab.visible` is off; `tab.height` drives the layout CSS var.

## Testing

1. Unit tests (`vp test`) for `src/store/modules/tab/shared.ts`, written before porting the code:
   - `getTabIdByRoute`: plain route → `path`; `multiTab` → path + sorted query (`?b=2&a=1` equals `?a=1&b=2`).
   - `getAllTabs`: order Home → fixed (by `fixedIndex`) → rest; no duplicate Home.
   - `getFixedTabIds`, `filterTabsByIds`, `isTabInTabs`, `reorderFixedTabs`.
   - `extractTabsByAllRoutes`: drops tabs whose route is gone.
   - `@/locales` is mocked with `vi.mock`. Minimal Vitest config (environment, `@` alias) is added to `vite.config.ts` only if needed.
2. Static checks: `vp check`, `vue-tsc --noEmit`, `vp build`.
3. Manual checks on the dev server (the user signs in, because login goes to the external ApiFox mock):
   - open, switch, close; closing the last tab activates the left one;
   - each context-menu action, including pin; pinned tabs survive "close all";
   - switch chrome / button / slider; toggle visibility; change height;
   - F5 with cache on keeps tabs; with cache off only Home + current;
   - switch en/vi, labels follow;
   - demo page: rename tab, `multiTab` with different queries, close About tab;
   - dark mode and mobile width.
