<script setup lang="ts">
import type { AdminLayoutProps } from '../../types'
import { computed } from 'vue'
import style from './index.module.css'
import { createLayoutCssVars, LAYOUT_MAX_Z_INDEX, LAYOUT_SCROLL_EL_ID } from './shared'

defineOptions({
  name: 'AdminLayout',
})

const props = withDefaults(defineProps<AdminLayoutProps>(), {
  mode: 'vertical',
  scrollMode: 'content',
  scrollElId: LAYOUT_SCROLL_EL_ID,
  commonClass: 'transition-all-300',
  fixedTop: true,
  maxZIndex: LAYOUT_MAX_Z_INDEX,
  headerVisible: true,
  headerHeight: 56,
  siderVisible: true,
  siderCollapse: false,
  siderWidth: 220,
  siderCollapsedWidth: 64,
  footerVisible: true,
  footerHeight: 48,
  rightFooter: false,
})

interface Emits {
  /** Update siderCollapse */
  (e: 'update:siderCollapse', collapse: boolean): void
}

const emit = defineEmits<Emits>()

type SlotFn = (props?: Record<string, unknown>) => any

interface Slots {
  /** Main */
  default?: SlotFn
  /** Header */
  header?: SlotFn
  /** Sider */
  sider?: SlotFn
  /** Footer */
  footer?: SlotFn
}

const slots = defineSlots<Slots>()

const cssVars = computed(() => createLayoutCssVars(props))

// config visible
const showHeader = computed(() => Boolean(slots.header) && props.headerVisible)
const showSider = computed(() => !props.isMobile && Boolean(slots.sider) && props.siderVisible)
const showMobileSider = computed(() => props.isMobile && Boolean(slots.sider) && props.siderVisible)
const showFooter = computed(() => Boolean(slots.footer) && props.footerVisible)

// scroll mode
const isWrapperScroll = computed(() => props.scrollMode === 'wrapper')
const isContentScroll = computed(() => props.scrollMode === 'content')

// layout direction
const isVertical = computed(() => props.mode === 'vertical')
const isHorizontal = computed(() => props.mode === 'horizontal')

const fixedHeader = computed(() => props.fixedTop || (isHorizontal.value && isWrapperScroll.value))

// css
const leftGapClass = computed(() => {
  if (!props.fullContent && showSider.value) {
    return props.siderCollapse ? style['left-gap_collapsed'] : style['left-gap']
  }

  return ''
})

const headerLeftGapClass = computed(() => (isVertical.value ? leftGapClass.value : ''))

const footerLeftGapClass = computed(() => {
  const condition1 = isVertical.value
  const condition2 = isHorizontal.value && isWrapperScroll.value && !props.fixedFooter
  const condition3 = Boolean(isHorizontal.value && props.rightFooter)

  if (condition1 || condition2 || condition3) {
    return leftGapClass.value
  }

  return ''
})

const siderPaddingClass = computed(() => {
  let cls = ''

  if (showHeader.value && !headerLeftGapClass.value) {
    cls += style['sider-padding-top']
  }
  if (showFooter.value && !footerLeftGapClass.value) {
    cls += ` ${style['sider-padding-bottom']}`
  }

  return cls
})

function handleClickMask() {
  emit('update:siderCollapse', true)
}
</script>

<template>
  <div class="relative h-full" :class="[commonClass]" :style="cssVars">
    <div
      :id="isWrapperScroll ? scrollElId : undefined"
      class="h-full flex flex-col"
      :class="[commonClass, scrollWrapperClass, { 'overflow-y-auto': isWrapperScroll }]"
    >
      <!-- Header -->
      <template v-if="showHeader">
        <header
          v-show="!fullContent"
          class="flex-shrink-0"
          :class="[
            style['layout-header'],
            commonClass,
            headerClass,
            headerLeftGapClass,
            { 'absolute top-0 left-0 w-full': fixedHeader },
          ]"
        >
          <slot name="header" />
        </header>
        <div
          v-show="!fullContent && fixedHeader"
          class="flex-shrink-0 overflow-hidden"
          :class="[style['layout-header-placement']]"
        />
      </template>

      <!-- Sider -->
      <template v-if="showSider">
        <aside
          v-show="!fullContent"
          class="absolute left-0 top-0 h-full"
          :class="[
            commonClass,
            siderClass,
            siderPaddingClass,
            siderCollapse ? style['layout-sider_collapsed'] : style['layout-sider'],
          ]"
        >
          <slot name="sider" />
        </aside>
      </template>

      <!-- Mobile Sider -->
      <template v-if="showMobileSider">
        <aside
          class="absolute left-0 top-0 h-full w-0 bg-white"
          :class="[
            commonClass,
            mobileSiderClass,
            style['layout-mobile-sider'],
            siderCollapse ? 'overflow-hidden' : style['layout-sider'],
          ]"
        >
          <slot name="sider" />
        </aside>
        <div
          v-show="!siderCollapse"
          class="absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.2)]"
          :class="[style['layout-mobile-sider-mask']]"
          @click="handleClickMask"
        />
      </template>

      <!-- Main Content -->
      <main
        :id="isContentScroll ? scrollElId : undefined"
        class="flex flex-col flex-grow"
        :class="[commonClass, contentClass, leftGapClass, { 'overflow-y-auto': isContentScroll }]"
      >
        <slot />
      </main>

      <!-- Footer -->
      <template v-if="showFooter">
        <footer
          v-show="!fullContent"
          class="flex-shrink-0"
          :class="[
            style['layout-footer'],
            commonClass,
            footerClass,
            footerLeftGapClass,
            { 'absolute left-0 bottom-0 w-full': fixedFooter },
          ]"
        >
          <slot name="footer" />
        </footer>
        <div
          v-show="!fullContent && fixedFooter"
          class="flex-shrink-0 overflow-hidden"
          :class="[style['layout-footer-placement']]"
        />
      </template>
    </div>
  </div>
</template>

<style scoped></style>
