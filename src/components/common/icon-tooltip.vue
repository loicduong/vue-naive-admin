<script lang="ts" setup>
import type { PopoverPlacement } from 'naive-ui'
import { computed, useSlots } from 'vue'

defineOptions({ name: 'IconTooltip' })

const props = withDefaults(defineProps<Props>(), {
  icon: 'mdi-help-circle',
  localIcon: '',
  desc: '',
  placement: 'top',
})

interface Props {
  icon?: string
  localIcon?: string
  desc?: string
  placement?: PopoverPlacement
}

const slots = useSlots()
const hasCustomTrigger = computed(() => Boolean(slots.trigger))

if (!hasCustomTrigger.value && !props.icon && !props.localIcon) {
  throw new Error('icon or localIcon is required when no custom trigger slot is provided')
}
</script>

<template>
  <NTooltip :placement="placement">
    <template #trigger>
      <slot name="trigger">
        <div class="cursor-pointer">
          <SvgIcon :icon="icon" :local-icon="localIcon" />
        </div>
      </slot>
    </template>
    <slot>
      <span>{{ desc }}</span>
    </slot>
  </NTooltip>
</template>
