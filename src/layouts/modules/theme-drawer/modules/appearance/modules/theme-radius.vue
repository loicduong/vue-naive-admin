<script setup lang="ts">
import { $t } from '@/locales'
import { useThemeStore } from '@/store/modules/theme'
import SettingItem from '../../../components/setting-item.vue'
import { NDivider, NInputNumber } from 'naive-ui'

defineOptions({
  name: 'ThemeRadius',
})

const themeStore = useThemeStore()
</script>

<template>
  <NDivider>{{ $t('theme.appearance.themeRadius.title') }}</NDivider>
  <TransitionGroup tag="div" name="setting-list" class="flex-col-stretch gap-3">
    <SettingItem key="1" :label="$t('theme.appearance.themeRadius.title')">
      <NInputNumber v-model:value="themeStore.themeRadius" size="small" :step="1" :min="0" :max="16" class="w-30" />
    </SettingItem>
  </TransitionGroup>
</template>

<style scoped></style>
