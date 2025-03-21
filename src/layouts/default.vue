<script setup lang="ts">
import type { LayoutMode } from '@sa/materials'
import { useAppStore } from '@/store/modules/app'
import { useThemeStore } from '@/store/modules/theme'
import { AdminLayout, LAYOUT_SCROLL_EL_ID } from '@sa/materials'
import { setupMixMenuContext } from './context'
import GlobalContent from './modules/global-content/index.vue'
import GlobalFooter from './modules/global-footer/index.vue'
import GlobalHeader from './modules/global-header/index.vue'
import GlobalSider from './modules/global-sider/index.vue'
import ThemeDrawer from './modules/theme-drawer/index.vue'

defineOptions({
  name: 'DefaultLayout',
})

const appStore = useAppStore()
const themeStore = useThemeStore()
const { childLevelMenus } = setupMixMenuContext()

const GlobalMenu = defineAsyncComponent(() => import('./modules/global-menu/index.vue'))

const layoutMode = computed(() => {
  const vertical: LayoutMode = 'vertical'
  return vertical
})

const headerProps = computed(() => {
  const { mode } = themeStore.layout

  const headerPropsConfig: Record<UnionKey.ThemeLayoutMode, App.Global.HeaderProps> = {
    'vertical': {
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

const siderWidth = computed(() => getSiderWidth())

const siderCollapsedWidth = computed(() => getSiderCollapsedWidth())

function getSiderWidth() {
  const { width, mixWidth, mixChildMenuWidth } = themeStore.sider

  let w = isVerticalMix.value ? mixWidth : width

  if (isVerticalMix.value && appStore.mixSiderFixed && childLevelMenus.value.length) {
    w += mixChildMenuWidth
  }

  return w
}

function getSiderCollapsedWidth() {
  const { collapsedWidth, mixCollapsedWidth, mixChildMenuWidth } = themeStore.sider

  let w = isVerticalMix.value ? mixCollapsedWidth : collapsedWidth

  if (isVerticalMix.value && appStore.mixSiderFixed && childLevelMenus.value.length) {
    w += mixChildMenuWidth
  }

  return w
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

<style lang="scss">
#__SCROLL_EL_ID__ {
  @include scrollbar();
}
</style>
