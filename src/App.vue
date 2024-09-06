<script setup lang="ts">
import GlobalBuildDesc from '@/layouts/modules/global-build-desc/index.vue'
import { getEnvVariable } from '@/utils/env'
import { darkTheme, NConfigProvider } from 'naive-ui'
import type { WatermarkProps } from 'naive-ui'
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

const watermarkProps = computed<WatermarkProps>(() => {
  return {
    content: themeStore.watermark?.text || 'VueNaiveAdmin',
    cross: true,
    fullscreen: true,
    fontSize: 16,
    lineHeight: 16,
    width: 384,
    height: 384,
    xOffset: 12,
    yOffset: 60,
    rotate: -15,
    zIndex: 9999,
  }
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
      <NWatermark v-if="themeStore.watermark?.visible" v-bind="watermarkProps" />
      <GlobalBuildDesc v-if="Boolean(buildDesc)" :data="buildDesc" />
    </AppProvider>
  </NConfigProvider>
</template>

<style scoped></style>
