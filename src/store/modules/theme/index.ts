import { SetupStoreId } from '@/constants/enum'
import { localStg } from '@/utils/storage'
import { defineStore } from 'pinia'
import {
  addThemeVarsToGlobal,
  createThemeToken,
  getNaiveTheme,
  initThemeSettings,
  toggleCssDarkMode,
} from './shared'

/** Theme store */
export const useThemeStore = defineStore(SetupStoreId.Theme, () => {
  const scope = effectScope()
  const osTheme = usePreferredColorScheme()

  /** Theme settings */
  const settings: Ref<App.Theme.ThemeSetting> = ref(initThemeSettings())

  /** Dark mode */
  const darkMode = computed(() => {
    if (settings.value.themeScheme === 'auto') {
      return osTheme.value === 'dark'
    }
    return settings.value.themeScheme === 'dark'
  })

  /** Theme colors */
  const themeColors = computed(() => {
    const { themeColor, otherColor } = settings.value
    const colors: App.Theme.ThemeColor = {
      primary: themeColor,
      ...otherColor,
    }
    return colors
  })

  /** Naive theme */
  const naiveTheme = computed(() => getNaiveTheme(themeColors.value))

  /**
   * Settings json
   *
   * It is for copy settings
   */
  const settingsJson = computed(() => JSON.stringify(settings.value))

  /** Reset store */
  function resetStore() {
    const themeStore = useThemeStore()

    themeStore.$reset()
  }

  /**
   * Set theme scheme
   *
   * @param themeScheme
   */
  function setThemeScheme(themeScheme: UnionKey.ThemeScheme) {
    settings.value.themeScheme = themeScheme
  }

  /** Toggle theme scheme */
  function toggleThemeScheme() {
    const themeSchemes: UnionKey.ThemeScheme[] = ['light', 'dark', 'auto']

    const index = themeSchemes.findIndex(item => item === settings.value.themeScheme)

    const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1

    const nextThemeScheme = themeSchemes[nextIndex]

    setThemeScheme(nextThemeScheme)
  }

  /**
   * Update theme colors
   *
   * @param key Theme color key
   * @param color Theme color
   */
  function updateThemeColors(key: App.Theme.ThemeColorKey, color: string) {
    const colorValue = color

    if (key === 'primary') {
      settings.value.themeColor = colorValue
    }
    else {
      settings.value.otherColor[key] = colorValue
    }
  }

  /**
   * Set theme layout
   *
   * @param mode Theme layout mode
   */
  function setThemeLayout(mode: UnionKey.ThemeLayoutMode) {
    settings.value.layout.mode = mode
  }

  /** Setup theme vars to global */
  function setupThemeVarsToGlobal() {
    const { themeTokens, darkThemeTokens } = createThemeToken(
      themeColors.value,
      settings.value.tokens,
    )
    addThemeVarsToGlobal(themeTokens, darkThemeTokens)
  }

  /** Cache theme settings */
  function cacheThemeSettings() {
    const isProd = import.meta.env.PROD

    if (!isProd)
      return

    localStg.set('themeSettings', settings.value)
  }

  // cache theme settings when page is closed or refreshed
  useEventListener(window, 'beforeunload', () => {
    cacheThemeSettings()
  })

  // watch store
  scope.run(() => {
    // watch dark mode
    watch(
      darkMode,
      (val) => {
        toggleCssDarkMode(val)
        localStg.set('darkMode', val)
      },
      { immediate: true },
    )

    // themeColors change, update css vars and storage theme color
    watch(
      themeColors,
      (val) => {
        setupThemeVarsToGlobal()
        localStg.set('themeColor', val.primary)
      },
      { immediate: true },
    )
  })

  /** On scope dispose */
  onScopeDispose(() => {
    scope.stop()
  })

  return {
    ...toRefs(settings.value),
    darkMode,
    themeColors,
    naiveTheme,
    settingsJson,
    resetStore,
    setThemeScheme,
    toggleThemeScheme,
    updateThemeColors,
    setThemeLayout,
  }
})
