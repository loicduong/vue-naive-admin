<script setup lang="ts">
import { $t } from '@/locales'
import { useAppStore } from '@/store/modules/app'
import AppearanceSettings from './modules/appearance/index.vue'
import ConfigOperation from './modules/config-operation.vue'
import GeneralSettings from './modules/general/index.vue'
import LayoutSettings from './modules/layout/index.vue'

defineOptions({
  name: 'ThemeDrawer',
})

const appStore = useAppStore()

const activeTab = ref('appearance')

const drawerWidth = computed(() => {
  const width = 400

  // On mobile devices, use 90% of viewport width with a maximum of 400px
  if (appStore.isMobile) {
    return `min(90vw, ${width}px)`
  }

  return 460
})
</script>

<template>
  <NDrawer v-model:show="appStore.themeDrawerVisible" display-directive="show" :width="drawerWidth">
    <NDrawerContent :title="$t('theme.themeDrawerTitle')" :native-scrollbar="false" closable>
      <NTabs v-model:value="activeTab" type="segment" size="medium" class="mb-16px">
        <NTab name="appearance" :tab="$t('theme.tabs.appearance')" />
        <NTab name="layout" :tab="$t('theme.tabs.layout')" />
        <NTab name="general" :tab="$t('theme.tabs.general')" />
      </NTabs>

      <div class="min-h-400px">
        <KeepAlive>
          <AppearanceSettings v-if="activeTab === 'appearance'" />
          <LayoutSettings v-else-if="activeTab === 'layout'" />
          <GeneralSettings v-else-if="activeTab === 'general'" />
        </KeepAlive>
      </div>

      <template #footer>
        <ConfigOperation />
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>
:deep(.n-tab) {
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.n-tab-pane) {
  padding: 0;
}
</style>
