<script setup lang="ts">
import { computed } from 'vue'
import { $t } from '@/locales'
import { useThemeStore } from '@/store/modules/theme'
import SettingItem from '../../../components/setting-item.vue'
import { NDivider, NInputNumber, NSwitch } from 'naive-ui'

defineOptions({
  name: 'FooterSettings',
})

const themeStore = useThemeStore()

const isWrapperScrollMode = computed(() => themeStore.layout.scrollMode === 'wrapper')
</script>

<template>
  <NDivider>{{ $t('theme.layout.footer.title') }}</NDivider>
  <TransitionGroup tag="div" name="setting-list" class="flex-col-stretch gap-3">
    <SettingItem key="1" :label="$t('theme.layout.footer.visible')">
      <NSwitch v-model:value="themeStore.footer.visible" />
    </SettingItem>
    <SettingItem
      v-if="themeStore.footer.visible && isWrapperScrollMode"
      key="2"
      :label="$t('theme.layout.footer.fixed')"
    >
      <NSwitch v-model:value="themeStore.footer.fixed" />
    </SettingItem>
    <SettingItem v-if="themeStore.footer.visible" key="3" :label="$t('theme.layout.footer.height')">
      <NInputNumber v-model:value="themeStore.footer.height" size="small" :step="1" class="w-30" />
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
