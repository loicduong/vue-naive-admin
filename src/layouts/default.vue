<script setup lang="ts">
import type { LayoutMode } from './modules/admin-layout/types'
import AdminLayout, { LAYOUT_SCROLL_EL_ID } from './modules/admin-layout'
import { useAppStore } from '@/store/modules/app'
import { useThemeStore } from '@/store/modules/theme'
import GlobalContent from './modules/global-content/index.vue'
import GlobalFooter from './modules/global-footer/index.vue'
import GlobalHeader from './modules/global-header/index.vue'
import { provideMixMenuContext } from './modules/global-menu/context'
import GlobalSider from './modules/global-sider/index.vue'
import GlobalTab from './modules/global-tab/index.vue'
import ThemeDrawer from './modules/theme-drawer/index.vue'
import { computed, defineAsyncComponent } from 'vue'

defineOptions({
  name: 'BaseLayout',
})

const appStore = useAppStore()
const themeStore = useThemeStore()
const { secondLevelMenus } = provideMixMenuContext()

const GlobalMenu = defineAsyncComponent(() => import('./modules/global-menu/index.vue'))

const layoutMode = computed(() => {
  const vertical: LayoutMode = 'vertical'
  return vertical
})

const headerProps = computed(() => {
  const { mode } = themeStore.layout

  const headerPropsConfig: Record<UnionKey.ThemeLayoutMode, App.Global.HeaderProps> = {
    vertical: {
      showLogo: false,
      showMenu: false,
      showMenuToggler: true,
    },
    'vertical-mix': {
      showLogo: false,
      showMenu: false,
      showMenuToggler: false,
    },
  }

  return headerPropsConfig[mode]
})

const isVerticalMix = computed(() => themeStore.layout.mode === 'vertical-mix')

const siderWidth = computed(() => getSiderAndCollapsedWidth(false))

const siderCollapsedWidth = computed(() => getSiderAndCollapsedWidth(true))

function getSiderAndCollapsedWidth(isCollapsed: boolean) {
  const {
    mixChildMenuWidth,
    collapsedWidth,
    width: themeWidth,
    mixCollapsedWidth,
    mixWidth: themeMixWidth,
  } = themeStore.sider

  const width = isCollapsed ? collapsedWidth : themeWidth
  const mixWidth = isCollapsed ? mixCollapsedWidth : themeMixWidth

  const isMixMode = isVerticalMix.value
  let finalWidth = isMixMode ? mixWidth : width

  if (isVerticalMix.value && appStore.mixSiderFixed && secondLevelMenus.value.length) {
    finalWidth += mixChildMenuWidth
  }

  return finalWidth
}
</script>

<template>
  <AdminLayout
    v-model:sider-collapse="appStore.siderCollapse"
    :mode="layoutMode"
    :scroll-el-id="LAYOUT_SCROLL_EL_ID"
    :scroll-mode="themeStore.layout.scrollMode"
    :is-mobile="appStore.isMobile"
    :full-content="appStore.fullContent"
    :fixed-top="themeStore.fixedHeader"
    :header-height="themeStore.header.height"
    :tab-visible="themeStore.tab.visible"
    :tab-height="themeStore.tab.height"
    :content-class="appStore.contentXScrollable ? 'overflow-x-hidden' : ''"
    :sider-width="siderWidth"
    :sider-collapsed-width="siderCollapsedWidth"
    :footer-visible="themeStore.footer.visible"
    :footer-height="themeStore.footer.height"
    :fixed-footer="themeStore.footer.fixed"
  >
    <template #header>
      <GlobalHeader v-bind="headerProps" />
    </template>
    <template #tab>
      <GlobalTab />
    </template>
    <template #sider>
      <GlobalSider />
    </template>
    <GlobalMenu />
    <GlobalContent />
    <ThemeDrawer />
    <template #footer>
      <GlobalFooter />
    </template>
  </AdminLayout>
</template>

<style>
#__SCROLL_EL_ID__ {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.5) transparent;
}

.dark #__SCROLL_EL_ID__ {
  /* guide safari use light color scrollbar */
  color-scheme: dark;
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
}

#__SCROLL_EL_ID__::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

#__SCROLL_EL_ID__::-webkit-scrollbar-thumb,
#__SCROLL_EL_ID__::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 7px;
}

#__SCROLL_EL_ID__::-webkit-scrollbar-track-piece {
  background-color: rgba(0, 0, 0, 0);
  border-radius: 0;
}
</style>
