<script setup lang="ts">
import { $t } from '@/locales'
import { useThemeStore } from '@/store/modules/theme'
import SettingItem from '../../../components/setting-item.vue'
import { NDivider, NInputNumber, NSwitch } from 'naive-ui'

defineOptions({
  name: 'HeaderSettings',
})

const themeStore = useThemeStore()
</script>

<template>
  <NDivider>{{ $t('theme.layout.header.title') }}</NDivider>
  <TransitionGroup tag="div" name="setting-list" class="flex flex-col items-stretch gap-3">
    <SettingItem key="1" :label="$t('theme.layout.header.height')">
      <NInputNumber v-model:value="themeStore.header.height" size="small" :step="1" class="w-30" />
    </SettingItem>
    <SettingItem key="2" :label="$t('theme.layout.header.breadcrumb.visible')">
      <NSwitch v-model:value="themeStore.header.breadcrumb.visible" />
    </SettingItem>
    <SettingItem
      v-if="themeStore.header.breadcrumb.visible"
      key="3"
      :label="$t('theme.layout.header.breadcrumb.showIcon')"
    >
      <NSwitch v-model:value="themeStore.header.breadcrumb.showIcon" />
    </SettingItem>
  </TransitionGroup>
</template>

<style scoped>
@reference "@/assets/css/tailwind.css";

.setting-list-move,
.setting-list-enter-active,
.setting-list-leave-active {
  @apply transition-all duration-300;
}

.setting-list-enter-from,
.setting-list-leave-to {
  @apply opacity-0 -translate-x-7.5;
}

.setting-list-leave-active {
  @apply absolute;
}
</style>
