<script setup lang="ts">
import type { Component } from 'vue'
import type { PageTabMode, PageTabProps } from './types'
import ButtonTab from './button-tab.vue'
import ChromeTab from './chrome-tab.vue'
import style from './index.module.css'
import { ACTIVE_COLOR, createTabCssVars, isPrimaryPointer } from './shared'
import SliderTab from './slider-tab.vue'
import SvgClose from './svg-close.vue'

defineOptions({
  name: 'PageTab',
})

const props = withDefaults(defineProps<PageTabProps>(), {
  mode: 'chrome',
  commonClass: 'transition-all-300',
  activeColor: ACTIVE_COLOR,
  closable: true,
})

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'close'): void
}

const activeTabComponent = computed(() => {
  const { mode, chromeClass, buttonClass, sliderClass } = props

  const tabComponentMap = {
    chrome: {
      component: ChromeTab,
      class: chromeClass,
    },
    button: {
      component: ButtonTab,
      class: buttonClass,
    },
    slider: {
      component: SliderTab,
      class: sliderClass,
    },
  } satisfies Record<PageTabMode, { component: Component; class?: string }>

  return tabComponentMap[mode]
})

const cssVars = computed(() => createTabCssVars(props.activeColor))

const bindProps = computed(() => {
  const { chromeClass: _chromeCls, buttonClass: _btnCls, sliderClass: _sliderCls, ...rest } = props

  return rest
})

function handleClose(event: PointerEvent) {
  // right and middle clicks on the close icon belong to the context menu and the middle-click setting
  if (!isPrimaryPointer(event)) return

  // do not let the tab itself switch to the route being closed
  event.stopPropagation()

  emit('close')
}
</script>

<template>
  <component :is="activeTabComponent.component" :class="activeTabComponent.class" :style="cssVars" v-bind="bindProps">
    <template #prefix>
      <slot name="prefix" />
    </template>
    <slot />
    <template #suffix>
      <slot name="suffix">
        <SvgClose v-if="closable" :class="[style['svg-close']]" @pointerdown="handleClose" />
      </slot>
    </template>
  </component>
</template>

<style scoped></style>
