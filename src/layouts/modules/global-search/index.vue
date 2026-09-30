<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import ButtonIcon from '@/components/custom/button-icon.vue'
import useBoolean from '@/hooks/common/use-boolean'
import { $t } from '@/locales'
import IconUilSearch from '~icons/uil/search'
import SearchModal from './search-modal.vue'

defineOptions({
  name: 'GlobalSearch',
  inheritAttrs: false,
})

const { bool: show, toggle } = useBoolean()

// Ctrl+K (⌘K on macOS) toggles the search from anywhere, overriding the browser's own Ctrl+K
useEventListener(window, 'keydown', (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    toggle()
  }
})
</script>

<template>
  <ButtonIcon v-bind="$attrs" :tooltip-content="`${$t('common.search')} (Ctrl+K)`" @click="toggle">
    <IconUilSearch />
  </ButtonIcon>
  <SearchModal v-model:show="show" />
</template>

<style scoped></style>
