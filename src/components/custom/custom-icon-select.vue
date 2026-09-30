<script lang="ts" setup>
import { computed, ref } from 'vue'
import { NEmpty, NInput, NPopover, useThemeVars } from 'naive-ui'
import SvgIcon from '@/components/custom/svg-icon.vue'

defineOptions({ name: 'CustomIconSelect' })

const props = withDefaults(defineProps<Props>(), {
  emptyIcon: 'mdi:apps',
})

const emit = defineEmits<Emits>()

interface Props {
  /** Selected icon */
  value: string
  /** List of icons */
  icons: string[]
  /** Icon for when nothing is selected */
  emptyIcon?: string
}

interface Emits {
  (e: 'update:value', val: string): void
}

const modelValue = computed({
  get() {
    return props.value
  },
  set(val: string) {
    emit('update:value', val)
  },
})

const themeVars = useThemeVars()

const selectedIcon = computed(() => modelValue.value || props.emptyIcon)

const searchValue = ref('')

const iconsList = computed(() => props.icons.filter(v => v.includes(searchValue.value)))

function handleChange(iconItem: string) {
  modelValue.value = iconItem
}
</script>

<template>
  <NPopover placement="bottom-end" trigger="click">
    <template #trigger>
      <NInput
        v-model:value="modelValue"
        readonly
        placeholder="Click to select the icon"
        :theme-overrides="{ paddingMedium: '0 0 0 12px' }"
      >
        <template #suffix>
          <SvgIcon
            :icon="selectedIcon"
            class="border p-[5px] text-[30px]"
            :style="{ borderColor: themeVars.borderColor }"
          />
        </template>
      </NInput>
    </template>
    <template #header>
      <NInput v-model:value="searchValue" placeholder="Search icon" />
    </template>
    <div v-if="iconsList.length > 0" class="grid grid-cols-9 h-auto overflow-auto">
      <span v-for="iconItem in iconsList" :key="iconItem" @click="handleChange(iconItem)">
        <SvgIcon
          :icon="iconItem"
          class="m-0.5 cursor-pointer border p-[5px] text-[30px]"
          :style="{ borderColor: modelValue === iconItem ? themeVars.primaryColor : themeVars.borderColor }"
        />
      </span>
    </div>
    <NEmpty v-else class="w-[306px]" description="You can't find anything" />
  </NPopover>
</template>
