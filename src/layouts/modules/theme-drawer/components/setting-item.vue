<script setup lang="ts">
defineOptions({
  name: 'SettingItem',
})

defineProps<Props>()

interface Props {
  /** Label */
  label: string
}
</script>

<template>
  <div class="w-full flex items-center justify-between">
    <div class="flex items-center">
      <span class="pr-2 text-base-text">{{ label }}</span>
      <slot name="suffix" />
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
