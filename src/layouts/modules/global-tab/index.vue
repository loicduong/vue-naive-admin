<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import { useTabStore } from '@/store/modules/tab'
import { useThemeStore } from '@/store/modules/theme'
import ContextMenu from './context-menu.vue'
import { useRoute } from 'vue-router'
import { reactive, watch } from 'vue'
import { NTab, NTabs } from 'naive-ui'
import DarkModeContainer from '@/components/common/dark-mode-container.vue'
import SvgIcon from '@/components/custom/svg-icon.vue'
import ReloadButton from '@/components/common/reload-button.vue'
import FullScreen from '@/components/common/full-screen.vue'

defineOptions({
  name: 'GlobalTab',
})

const route = useRoute()
const appStore = useAppStore()
const themeStore = useThemeStore()
const tabStore = useTabStore()

const MIDDLE_MOUSE_BUTTON = 1

function getContextMenuDisabledKeys(tabId: string) {
  const disabledKeys: App.Global.DropdownKey[] = []

  if (tabStore.isTabRetain(tabId)) {
    const homeDisable: App.Global.DropdownKey[] = ['closeCurrent', 'closeLeft']
    disabledKeys.push(...homeDisable)
  }

  return disabledKeys
}

function handleUpdateValue(tabId: string) {
  const tab = tabStore.tabs.find(item => item.id === tabId)
  if (!tab) return

  tabStore.switchRouteByTab(tab)
}

function handleCloseTab(tabId: string) {
  tabStore.removeTab(tabId)
}

function handleMousedown(e: MouseEvent, tab: App.Global.Tab) {
  const isMiddleClick = e.button === MIDDLE_MOUSE_BUTTON
  if (!isMiddleClick || !themeStore.tab.closeTabByMiddleClick) {
    return
  }

  if (tabStore.isTabRetain(tab.id)) {
    return
  }

  e.preventDefault()
  handleCloseTab(tab.id)
}

async function refresh() {
  appStore.reloadPage(500)
}

interface DropdownConfig {
  visible: boolean
  x: number
  y: number
  tabId: string
}

const dropdown: DropdownConfig = reactive({
  visible: false,
  x: 0,
  y: 0,
  tabId: '',
})

function setDropdown(config: Partial<DropdownConfig>) {
  Object.assign(dropdown, config)
}

let isClickContextMenu = false

function handleDropdownVisible(visible: boolean | undefined) {
  if (!isClickContextMenu) {
    setDropdown({ visible })
  }
}

async function handleContextMenu(e: MouseEvent, tabId: string) {
  e.preventDefault()

  const { clientX, clientY } = e

  isClickContextMenu = true

  const DURATION = dropdown.visible ? 150 : 0

  setDropdown({ visible: false })

  setTimeout(() => {
    setDropdown({
      visible: true,
      x: clientX,
      y: clientY,
      tabId,
    })
    isClickContextMenu = false
  }, DURATION)
}

function getTabProps(tab: App.Global.Tab) {
  return {
    onMousedown: (e: MouseEvent) => handleMousedown(e, tab),
    onContextmenu: (e: MouseEvent) => handleContextMenu(e, tab.id),
  }
}

function init() {
  tabStore.initTabStore(route)
}

// watch
watch(
  () => route.fullPath,
  () => {
    tabStore.addTab(route)
  },
)

// init
init()
</script>

<template>
  <DarkModeContainer class="size-full flex-y-center gap-2 px-4 shadow-tab">
    <NTabs
      type="card"
      center-active-tab
      class="flex-1-hidden"
      :value="tabStore.activeTabId"
      @update:value="handleUpdateValue"
      @close="handleCloseTab"
    >
      <NTab
        v-for="tab in tabStore.tabs"
        :key="tab.id"
        :name="tab.id"
        :closable="!tabStore.isTabRetain(tab.id)"
        :tab-props="getTabProps(tab)"
      >
        <div class="flex-y-center gap-1.5">
          <SvgIcon :icon="tab.icon" :local-icon="tab.localIcon" class="text-[16px]" />
          <span class="max-w-60 ellipsis-text">{{ tab.label }}</span>
        </div>
      </NTab>
    </NTabs>
    <ReloadButton :loading="!appStore.reloadFlag" @click="refresh" />
    <FullScreen :full="appStore.fullContent" @click="appStore.toggleFullContent" />
  </DarkModeContainer>
  <ContextMenu
    :visible="dropdown.visible"
    :tab-id="dropdown.tabId"
    :disabled-keys="getContextMenuDisabledKeys(dropdown.tabId)"
    :x="dropdown.x"
    :y="dropdown.y"
    @update:visible="handleDropdownVisible"
  />
</template>

<style scoped></style>
