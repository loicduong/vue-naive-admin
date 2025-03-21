<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import { useThemeStore } from '@/store/modules/theme'
import VerticalMenu from './modules/vertical-menu.vue'
import VerticalMixMenu from './modules/vertical-mix-menu.vue'

defineOptions({
  name: 'GlobalMenu',
})

const appStore = useAppStore()
const themeStore = useThemeStore()

const activeMenu = computed(() => {
  const menuMap: Record<UnionKey.ThemeLayoutMode, Component> = {
    'vertical': VerticalMenu,
    'vertical-mix': VerticalMixMenu,
  }

  return menuMap[themeStore.layout.mode]
})

const reRenderVertical = computed(() => themeStore.layout.mode === 'vertical' && appStore.isMobile)
</script>

<template>
  <component :is="activeMenu" :key="reRenderVertical" />
</template>

<style scoped></style>
