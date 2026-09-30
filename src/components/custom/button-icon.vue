<script setup lang="ts">
import type { PopoverPlacement } from 'naive-ui'
import { twMerge } from 'tailwind-merge'
import { NButton, NTooltip } from 'naive-ui'
import SvgIcon from '@/components/custom/svg-icon.vue'

defineOptions({
  name: 'ButtonIcon',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  class: '',
  icon: '',
  tooltipContent: '',
  tooltipPlacement: 'bottom',
  zIndex: 98,
})

interface Props {
  /** Button class */
  class?: string
  /** Iconify icon name */
  icon?: string
  /** Tooltip content */
  tooltipContent?: string
  /** Tooltip placement */
  tooltipPlacement?: PopoverPlacement
  zIndex?: number
}

const DEFAULT_CLASS = 'h-[36px] text-icon'
</script>

<template>
  <NTooltip :placement="tooltipPlacement" :z-index="zIndex" :disabled="!tooltipContent">
    <template #trigger>
      <NButton quaternary :class="twMerge(DEFAULT_CLASS, props.class)" v-bind="$attrs">
        <div class="flex items-center justify-center gap-2">
          <slot>
            <SvgIcon :icon="icon" />
          </slot>
        </div>
      </NButton>
    </template>
    {{ tooltipContent }}
  </NTooltip>
</template>

<style scoped></style>
