<script setup lang="ts">
import { $t } from '@/locales'
import { useThemeStore } from '@/store/modules/theme'
import SettingItem from '../../../components/setting-item.vue'
import { NDivider, NInputNumber, NSwitch } from 'naive-ui'
import IconTooltip from '@/components/common/icon-tooltip.vue'

defineOptions({
  name: 'TabSettings',
})

const themeStore = useThemeStore()
</script>

<template>
  <NDivider>{{ $t('theme.layout.tab.title') }}</NDivider>
  <TransitionGroup tag="div" name="setting-list" class="flex flex-col items-stretch gap-3">
    <SettingItem key="1" :label="$t('theme.layout.tab.visible')">
      <NSwitch v-model:value="themeStore.tab.visible" />
    </SettingItem>
    <SettingItem v-if="themeStore.tab.visible" key="2" :label="$t('theme.layout.tab.cache')">
      <template #suffix>
        <IconTooltip :desc="$t('theme.layout.tab.cacheTip')" />
      </template>
      <NSwitch v-model:value="themeStore.tab.cache" />
    </SettingItem>
    <SettingItem v-if="themeStore.tab.visible" key="3" :label="$t('theme.layout.tab.height')">
      <NInputNumber v-model:value="themeStore.tab.height" size="small" :step="1" class="w-30" />
    </SettingItem>
    <SettingItem v-if="themeStore.tab.visible" key="4" :label="$t('theme.layout.tab.closeByMiddleClick')">
      <template #suffix>
        <IconTooltip :desc="$t('theme.layout.tab.closeByMiddleClickTip')" />
      </template>
      <NSwitch v-model:value="themeStore.tab.closeTabByMiddleClick" />
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
