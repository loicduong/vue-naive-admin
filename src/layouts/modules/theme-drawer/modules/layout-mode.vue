<script setup lang="ts">
import { $t } from '@/locales'
import { useAppStore } from '@/store/modules/app'
import { useThemeStore } from '@/store/modules/theme'
import LayoutModeCard from '../components/layout-mode-card.vue'

defineOptions({
  name: 'LayoutMode',
})

const appStore = useAppStore()
const themeStore = useThemeStore()
</script>

<template>
  <NDivider>{{ $t('theme.layoutMode.title') }}</NDivider>
  <LayoutModeCard v-model:mode="themeStore.layout.mode" :disabled="appStore.isMobile">
    <template #vertical>
      <div class="layout-sider h-full w-18px" />
      <div class="vertical-wrapper">
        <div class="layout-header" />
        <div class="layout-main" />
      </div>
    </template>
    <template #vertical-mix>
      <div class="layout-sider h-full w-8px" />
      <div class="layout-sider h-full w-16px" />
      <div class="vertical-wrapper">
        <div class="layout-header" />
        <div class="layout-main" />
      </div>
    </template>
  </LayoutModeCard>
</template>

<style scoped>
.layout-header {
  --uno: h-16px bg-primary rd-4px;
}

.layout-sider {
  --uno: bg-primary-300 rd-4px;
}

.layout-main {
  --uno: flex-1 bg-primary-200 rd-4px;
}

.vertical-wrapper {
  --uno: flex-1 flex-col gap-6px;
}
</style>
