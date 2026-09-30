<script setup lang="ts">
import { computed } from 'vue'
import { $t } from '@/locales'
import { useThemeStore } from '@/store/modules/theme'
import SettingItem from '../../../components/setting-item.vue'
import { NDivider, NInputNumber } from 'naive-ui'

defineOptions({
  name: 'SiderSettings',
})

const themeStore = useThemeStore()

const layoutMode = computed(() => themeStore.layout.mode)
const isMixLayoutMode = computed(() => layoutMode.value.includes('mix'))
</script>

<template>
  <NDivider>{{ $t('theme.layout.sider.title') }}</NDivider>
  <TransitionGroup tag="div" name="setting-list" class="flex flex-col items-stretch gap-3">
    <SettingItem v-if="layoutMode === 'vertical'" key="1" :label="$t('theme.layout.sider.width')">
      <NInputNumber v-model:value="themeStore.sider.width" size="small" :step="1" class="w-30" />
    </SettingItem>
    <SettingItem v-if="layoutMode === 'vertical'" key="2" :label="$t('theme.layout.sider.collapsedWidth')">
      <NInputNumber v-model:value="themeStore.sider.collapsedWidth" size="small" :step="1" class="w-30" />
    </SettingItem>
    <SettingItem v-if="isMixLayoutMode" key="3" :label="$t('theme.layout.sider.mixWidth')">
      <NInputNumber v-model:value="themeStore.sider.mixWidth" size="small" :step="1" class="w-30" />
    </SettingItem>
    <SettingItem v-if="isMixLayoutMode" key="4" :label="$t('theme.layout.sider.mixCollapsedWidth')">
      <NInputNumber v-model:value="themeStore.sider.mixCollapsedWidth" size="small" :step="1" class="w-30" />
    </SettingItem>
    <SettingItem v-if="layoutMode === 'vertical-mix'" key="5" :label="$t('theme.layout.sider.mixChildMenuWidth')">
      <NInputNumber v-model:value="themeStore.sider.mixChildMenuWidth" size="small" :step="1" class="w-30" />
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
