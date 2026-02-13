<script setup lang="ts">
import type { PopoverPlacement } from 'naive-ui'
import { themeLayoutModeRecord } from '@/constants/app'
import { $t } from '@/locales'

defineOptions({
  name: 'LayoutModeCard',
})

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

interface Props {
  /** Layout mode */
  mode: UnionKey.ThemeLayoutMode
  /** Disabled */
  disabled?: boolean
}

interface Emits {
  /** Layout mode change */
  (e: 'update:mode', mode: UnionKey.ThemeLayoutMode): void
}

type LayoutConfig = Record<
  UnionKey.ThemeLayoutMode,
  {
    placement: PopoverPlacement
    menuClass: string
    mainClass: string
  }
>

const layoutConfig: LayoutConfig = {
  'vertical': {
    placement: 'bottom',
    menuClass: 'w-1/3 h-full',
    mainClass: 'w-2/3 h-3/4',
  },
  'vertical-mix': {
    placement: 'bottom',
    menuClass: 'w-1/4 h-full',
    mainClass: 'w-2/3 h-3/4',
  },
}

function handleChangeMode(mode: UnionKey.ThemeLayoutMode) {
  if (props.disabled)
    return

  emit('update:mode', mode)
}
</script>

<template>
  <div class="grid grid-cols-2 gap-x-16px gap-y-12px md:grid-cols-3">
    <div
      v-for="(item, key) in layoutConfig"
      :key="key"
      class="flex-col-center cursor-pointer"
      :class="[mode === key ? 'border-primary' : 'border-transparent']"
      @click="handleChangeMode(key)"
    >
      <NTooltip :placement="item.placement">
        <template #trigger>
          <div
            class="h-64px w-96px gap-6px rd-4px p-6px shadow ring-2 ring-transparent transition-all hover:ring-primary"
            :class="{ '!ring-primary': mode === key }"
          >
            <div class="h-full w-full flex gap-1">
              <slot :name="key" />
            </div>
          </div>
        </template>
        {{ $t(`theme.layout.layoutMode.${key}_detail`) }}
      </NTooltip>
      <p class="mt-8px text-12px">
        {{ $t(themeLayoutModeRecord[key]) }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
