<script setup lang="ts">
import { $t } from '@/locales'
import { useAppStore } from '@/store/modules/app'
import { useThemeStore } from '@/store/modules/theme'
import LayoutModeCard from '../../../components/layout-mode-card.vue'
import { NDivider } from 'naive-ui'

defineOptions({
  name: 'LayoutMode',
})

const appStore = useAppStore()
const themeStore = useThemeStore()
</script>

<template>
  <NDivider>{{ $t('theme.layout.layoutMode.title') }}</NDivider>
  <LayoutModeCard v-model:mode="themeStore.layout.mode" :disabled="appStore.isMobile">
    <template #vertical>
      <div class="layout-sider h-full w-4.5 bg-primary-400!" />
      <div class="vertical-wrapper">
        <div class="layout-header bg-primary-100" />
        <div class="layout-main" />
      </div>
    </template>
    <template #vertical-mix>
      <div class="layout-sider h-full w-2 bg-primary-400!" />
      <div class="layout-sider h-full w-4 bg-primary-200!" />
      <div class="vertical-wrapper">
        <div class="layout-header bg-primary-100" />
        <div class="layout-main" />
      </div>
    </template>
  </LayoutModeCard>
</template>

<style scoped>
@reference "@/assets/css/tailwind.css";

.layout-header {
  @apply h-4 rounded-sm;
}

.layout-sider {
  @apply bg-primary-200 rounded-sm;
}

.layout-main {
  @apply flex-1 bg-primary-100 rounded-sm;
}

.vertical-wrapper {
  @apply flex-1 flex flex-col gap-1.5;
}
</style>
