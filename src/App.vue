<script setup lang="ts">
import { darkTheme, NConfigProvider } from 'naive-ui'
import GlobalBuildDesc from '@/layouts/modules/global-build-desc/index.vue'
import { getEnvVariable } from '@/utils/env'
import { naiveDateLocales, naiveLocales } from './locales/naive'
import { useAppStore } from './store/modules/app'
import { useThemeStore } from './store/modules/theme'

defineOptions({
  name: 'App',
})

const appStore = useAppStore()
const themeStore = useThemeStore()

const naiveDarkTheme = computed(() => (themeStore.darkMode ? darkTheme : undefined))

const naiveLocale = computed(() => {
  return naiveLocales[appStore.locale]
})

const naiveDateLocale = computed(() => {
  return naiveDateLocales[appStore.locale]
})

const buildDesc = computed(() => `${getEnvVariable('VITE_BUILD_PREFIX')}${BUILD_DESC}`)
</script>

<template>
  <NConfigProvider
    :theme="naiveDarkTheme"
    :theme-overrides="themeStore.naiveTheme"
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
    class="h-full"
  >
    <AppProvider>
      <RouterView class="bg-layout" />
      <GlobalBuildDesc v-if="Boolean(buildDesc)" :data="buildDesc" />
    </AppProvider>
  </NConfigProvider>
</template>

<style scoped></style>
