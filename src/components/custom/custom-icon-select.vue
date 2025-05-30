<script lang="ts" setup>
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
      <NInput v-model:value="modelValue" readonly placeholder="Click to select the icon">
        <template #suffix>
          <SvgIcon :icon="selectedIcon" class="p-5px text-30px" />
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
          class="m-2px cursor-pointer border-1px border-#d9d9d9 p-5px text-30px"
          :class="{ 'border-primary': modelValue === iconItem }"
        />
      </span>
    </div>
    <NEmpty v-else class="w-306px" description="You can't find anything" />
  </NPopover>
</template>

<style lang="scss" scoped>
:deep(.n-input-wrapper) {
  padding-right: 0;
}

:deep(.n-input__suffix) {
  border: 1px solid #d9d9d9;
}
</style>
