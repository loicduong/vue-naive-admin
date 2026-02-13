<script setup lang="ts">
import { $t } from '@/locales'
import { useThemeStore } from '@/store/modules/theme'
import SettingItem from '../../../components/setting-item.vue'

defineOptions({
  name: 'GlobalSettings',
})

const themeStore = useThemeStore()
</script>

<template>
  <div class="flex-col-stretch gap-16px">
    <SettingItem :label="$t('theme.general.multilingual.visible')">
      <NSwitch v-model:value="themeStore.header.multilingual.visible" />
    </SettingItem>
  </div>
</template>

<style scoped>
.setting-list-move,
.setting-list-enter-active,
.setting-list-leave-active {
  --uno: transition-all-300;
}

.setting-list-enter-from,
.setting-list-leave-to {
  --uno: opacity-0 -translate-x-30px;
}

.setting-list-leave-active {
  --uno: absolute;
}
</style>
