<script setup lang="ts">
import { transformColorWithOpacity } from '@/utils/color'
import SimpleScrollbar from '@/components/common/simple-scrollbar.vue'
import { createReusableTemplate } from '@vueuse/core'
import { computed } from 'vue'
import MenuToggler from '@/components/common/menu-toggler.vue'

defineOptions({
  name: 'FirstLevelMenu',
})

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

interface Props {
  menus: App.Global.Menu[]
  activeMenuKey?: string
  siderCollapse?: boolean
  darkMode?: boolean
  themeColor: string
}

interface Emits {
  (e: 'select', menuKey: App.Global.RouteKey): boolean
  (e: 'toggleSiderCollapse'): void
}

interface MixMenuItemProps {
  /** Menu item label */
  label: App.Global.Menu['label']
  /** Menu item icon */
  icon: App.Global.Menu['icon']
  /** Active menu item */
  active: boolean
  /** Mini size */
  isMini?: boolean
}
const [DefineMixMenuItem, MixMenuItem] = createReusableTemplate<MixMenuItemProps>()

const selectedBgColor = computed(() => {
  const { darkMode, themeColor } = props

  const light = transformColorWithOpacity(themeColor, 0.1, '#ffffff')
  const dark = transformColorWithOpacity(themeColor, 0.3, '#000000')

  return darkMode ? dark : light
})

function handleClickMixMenu(menuKey: App.Global.RouteKey) {
  emit('select', menuKey)
}

function toggleSiderCollapse() {
  emit('toggleSiderCollapse')
}
</script>

<template>
  <!-- define component: MixMenuItem -->
  <DefineMixMenuItem v-slot="{ label, icon, active, isMini }">
    <div
      class="mx-1 mb-1.5 flex flex-col items-center justify-center cursor-pointer rounded-lg bg-transparent px-1 py-2 transition duration-300 hover:bg-[rgb(0,0,0,0.08)]"
      :class="{
        'text-primary selected-mix-menu': active,
      }"
    >
      <component :is="icon" :class="[isMini ? 'text-icon-small' : 'text-icon-large']" />
      <p
        class="w-full truncate text-center text-[12px] transition-[height] duration-300"
        :class="[isMini ? 'h-0 pt-0' : 'h-5 pt-1']"
      >
        {{ label }}
      </p>
    </div>
  </DefineMixMenuItem>
  <!-- define component end: MixMenuItem -->

  <div class="h-full flex flex-col items-stretch flex-1 overflow-hidden">
    <slot />
    <SimpleScrollbar>
      <MixMenuItem
        v-for="menu in menus"
        :key="menu.key"
        :label="menu.label"
        :icon="menu.icon"
        :active="menu.key === activeMenuKey"
        :is-mini="siderCollapse"
        @click="handleClickMixMenu(menu.routeKey)"
      />
    </SimpleScrollbar>
    <MenuToggler arrow-icon :collapsed="siderCollapse" :z-index="99" @click="toggleSiderCollapse" />
  </div>
</template>

<style scoped>
.selected-mix-menu {
  background-color: v-bind(selectedBgColor);
}
</style>
