<script setup lang="ts">
import { LAYOUT_SCROLL_EL_ID } from '@sa/materials'
import { useAppStore } from '@/store/modules/app'
import { useRouteStore } from '@/store/modules/route'
import { useThemeStore } from '@/store/modules/theme'

defineOptions({
  name: 'GlobalContent',
})

withDefaults(defineProps<Props>(), {
  showPadding: true,
})

interface Props {
  /** Show padding for content */
  showPadding?: boolean
}

const appStore = useAppStore()
const themeStore = useThemeStore()
const routeStore = useRouteStore()

const transitionName = computed(() => (themeStore.page.animate ? themeStore.page.animateMode : ''))

function resetScroll() {
  const el = document.querySelector(`#${LAYOUT_SCROLL_EL_ID}`)

  el?.scrollTo({ left: 0, top: 0 })
}
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition
      :name="transitionName"
      mode="out-in"
      @before-leave="appStore.setContentXScrollable(true)"
      @after-leave="resetScroll"
      @after-enter="appStore.setContentXScrollable(false)"
    >
      <KeepAlive :include="routeStore.cacheRoutes" :exclude="routeStore.excludeCacheRoutes">
        <component
          :is="Component"
          v-if="appStore.reloadFlag"
          :key="route.path"
          :class="{ 'p-16px': showPadding }"
          class="flex-grow bg-layout transition-300"
        />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<style></style>
