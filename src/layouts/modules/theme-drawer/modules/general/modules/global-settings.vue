<script setup lang="ts">
import { $t } from '@/locales'
import { useThemeStore } from '@/store/modules/theme'
import SettingItem from '../../../components/setting-item.vue'
import { NSwitch } from 'naive-ui'

defineOptions({
  name: 'GlobalSettings',
})

const themeStore = useThemeStore()
</script>

<template>
  <div class="flex-col-stretch gap-4">
    <SettingItem :label="$t('theme.general.multilingual.visible')">
      <NSwitch v-model:value="themeStore.header.multilingual.visible" />
    </SettingItem>
  </div>
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
