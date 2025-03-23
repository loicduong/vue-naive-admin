import { useRouteStore } from '@/store/modules/route'
import { useContext } from '@sa/hooks'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const { setupStore: setupMixMenuContext, useStore: useMixMenuContext } = useContext('mix-menu', useMixMenu)

function useMixMenu() {
  const route = useRoute()
  const routeStore = useRouteStore()
  const { selectedKey } = useMenu()

  const activeFirstLevelMenuKey = ref('')

  function setActiveFirstLevelMenuKey(key: string) {
    activeFirstLevelMenuKey.value = key
  }

  function getActiveFirstLevelMenuKey() {
    const [firstLevelRouteName] = selectedKey.value.split('/')

    setActiveFirstLevelMenuKey(firstLevelRouteName)
  }

  const allMenus = computed<App.Global.Menu[]>(() => routeStore.menus)

  const childLevelMenus = computed<App.Global.Menu[]>(
    () => routeStore.menus.find(menu => menu.key === activeFirstLevelMenuKey.value)?.children || [],
  )

  watch(
    () => route.name,
    () => {
      getActiveFirstLevelMenuKey()
    },
    { immediate: true },
  )

  return {
    allMenus,
    childLevelMenus,
    activeFirstLevelMenuKey,
    setActiveFirstLevelMenuKey,
    getActiveFirstLevelMenuKey,
  }
}

export function useMenu() {
  const route = useRoute()

  const selectedKey = computed(() => {
    const { hideInMenu, activeMenu } = route.meta
    const name = route.name as string

    const routeName = (hideInMenu ? activeMenu : name) || name

    return routeName
  })

  return {
    selectedKey,
  }
}
