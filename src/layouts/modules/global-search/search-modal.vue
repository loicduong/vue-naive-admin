<script setup lang="ts">
import type { InputInst } from 'naive-ui'
import { NEmpty, NInput, NModal, NScrollbar } from 'naive-ui'
import { useEventListener } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'

import { useRouterPush } from '@/hooks/common/router'
import { $t } from '@/locales'
import { useAppStore } from '@/store/modules/app'
import { useRouteStore } from '@/store/modules/route'
import IconUilSearch from '~icons/uil/search'
import { filterSearchMenus, getMenuTarget, getSearchKeyAction, moveActiveIndex } from './shared'

defineOptions({
  name: 'SearchModal',
})

const visible = defineModel<boolean>('show', { required: true })

const { routerPushByKeyWithMetaQuery } = useRouterPush()
const appStore = useAppStore()
const routeStore = useRouteStore()

const inputRef = ref<InputInst>()
const listRef = ref<HTMLElement>()
const keyword = ref('')
const activeIndex = ref(-1)

function getMenuTitle(menu: App.Global.Menu) {
  if (menu.i18nKey) return $t(menu.i18nKey)

  return typeof menu.label === 'string' ? menu.label : ''
}

const results = computed(() => filterSearchMenus(routeStore.searchMenus, keyword.value, getMenuTitle))

watch(results, value => {
  activeIndex.value = value.length ? 0 : -1
})

function scrollActiveIntoView() {
  nextTick(() => {
    listRef.value?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  })
}

function move(step: 1 | -1) {
  activeIndex.value = moveActiveIndex(activeIndex.value, results.value.length, step)
  scrollActiveIntoView()
}

function select(menu?: App.Global.Menu) {
  if (!menu) return

  visible.value = false

  const target = getMenuTarget(menu)

  // open external links right away, while the key press / click still counts as a user action for popup blockers
  if (target.type === 'href') {
    window.open(target.href, '_blank')
    return
  }

  routerPushByKeyWithMetaQuery(target.routeKey)
}

function handleKeydown(e: KeyboardEvent) {
  const action = getSearchKeyAction(e)

  if (action === 'up' || action === 'down') {
    e.preventDefault()
    move(action === 'down' ? 1 : -1)
  } else if (action === 'select') {
    e.preventDefault()
    select(results.value[activeIndex.value])
  }
}

// start every search fresh; done on open (not after the leave animation) so a quick reopen is also clean
watch(visible, value => {
  if (!value) return

  keyword.value = ''
  nextTick(() => inputRef.value?.focus())
})

// NModal's own close-on-esc relies on its focus trap, which does not fire here; close on Esc while open
useEventListener(window, 'keydown', (e: KeyboardEvent) => {
  if (visible.value && getSearchKeyAction(e) === 'close') {
    visible.value = false
  }
})
</script>

<template>
  <NModal
    v-model:show="visible"
    preset="card"
    :title="$t('common.search')"
    :bordered="false"
    :style="{ width: appStore.isMobile ? '100%' : '600px' }"
    class="top-[10vh] self-start"
  >
    <NInput
      ref="inputRef"
      v-model:value="keyword"
      clearable
      :placeholder="$t('common.keywordSearch')"
      @keydown="handleKeydown"
    >
      <template #prefix>
        <IconUilSearch class="text-[15px] text-gray-400" />
      </template>
    </NInput>

    <div class="mt-3">
      <NEmpty v-if="keyword.trim() && !results.length" :description="$t('common.noData')" class="py-6" />
      <NScrollbar v-else-if="results.length" class="max-h-[50vh]">
        <div ref="listRef" class="flex flex-col gap-2 pr-3">
          <div
            v-for="(item, index) in results"
            :key="item.routeKey"
            :data-active="index === activeIndex"
            class="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition-colors"
            :class="index === activeIndex ? 'bg-primary text-white' : 'bg-layout'"
            @mouseenter="activeIndex = index"
            @click="select(item)"
          >
            <component :is="item.icon" v-if="item.icon" class="shrink-0 text-lg" />
            <span class="flex-1 truncate">{{ getMenuTitle(item) }}</span>
            <span class="shrink-0 text-xs opacity-60">{{ item.routeKey }}</span>
          </div>
        </div>
      </NScrollbar>
    </div>

    <template #footer>
      <div class="flex items-center gap-4 text-xs text-gray-500">
        <span><kbd>↵</kbd> {{ $t('common.searchSelect') }}</span>
        <span><kbd>↑</kbd> <kbd>↓</kbd> {{ $t('common.searchNavigate') }}</span>
        <span><kbd>Esc</kbd> {{ $t('common.searchClose') }}</span>
      </div>
    </template>
  </NModal>
</template>

<style scoped>
kbd {
  display: inline-block;
  min-width: 1.4em;
  padding: 0 0.3em;
  border: 1px solid currentcolor;
  border-radius: 4px;
  text-align: center;
  font-family: inherit;
}
</style>
