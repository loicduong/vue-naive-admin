<script setup lang="ts">
import { GLOBAL_HEADER_MENU_ID } from '@/constants/app'
import { useAppStore } from '@/store/modules/app'
import { useThemeStore } from '@/store/modules/theme'
import GlobalBreadcrumb from '../global-breadcrumb/index.vue'
import GlobalLogo from '../global-logo/index.vue'
import GlobalSearch from '../global-search/index.vue'
import ThemeButton from './components/theme-button.vue'
import UserAvatar from './components/user-avatar.vue'

defineOptions({
  name: 'GlobalHeader',
})

interface Props {
  /** Whether to show the logo */
  showLogo?: App.Global.HeaderProps['showLogo']
  /** Whether to show the menu toggler */
  showMenuToggler?: App.Global.HeaderProps['showMenuToggler']
  /** Whether to show the menu */
  showMenu?: App.Global.HeaderProps['showMenu']
}

defineProps<Props>()

const appStore = useAppStore()
const themeStore = useThemeStore()
const { isFullscreen, toggle } = useFullscreen()
const isAuthRouteVisible = computed(() => import.meta.env.VITE_AUTH_ROUTE_VISIBLE !== 'N')
</script>

<template>
  <DarkModeContainer class="h-full flex-y-center px-12px shadow-header">
    <GlobalLogo v-if="showLogo" class="h-full" :style="{ width: `${themeStore.sider.width}px` }" />
    <MenuToggler
      v-if="showMenuToggler"
      :collapsed="appStore.siderCollapse"
      @click="appStore.toggleSiderCollapse"
    />
    <div v-if="showMenu" :id="GLOBAL_HEADER_MENU_ID" class="h-full flex-y-center flex-1-hidden" />
    <div v-else class="h-full flex-y-center flex-1-hidden">
      <GlobalBreadcrumb v-if="!appStore.isMobile" class="ml-12px" />
    </div>
    <div class="h-full flex-y-center justify-end">
      <GlobalSearch />
      <FullScreen
        v-if="!appStore.isMobile"
        id="global-full-screen"
        :full="isFullscreen"
        @click="toggle"
      />
      <LangSwitch
        v-if="themeStore.header.multilingual.visible"
        :lang="appStore.locale"
        :lang-options="appStore.localeOptions"
        @change-lang="appStore.changeLocale"
      />
      <ThemeSchemaSwitch
        id="global-theme-schema-switch"
        :theme-schema="themeStore.themeScheme"
        :is-dark="themeStore.darkMode"
        @switch="themeStore.toggleThemeScheme"
      />
      <ThemeButton id="global-theme-switch" />
      <UserAvatar v-if="isAuthRouteVisible" />
    </div>
  </DarkModeContainer>
</template>

<style scoped></style>
