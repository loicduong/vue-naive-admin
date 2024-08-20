<script setup lang="ts">
defineOptions({
  name: 'SettingItem',
})

interface Props {
  /** Label */
  label: string
}

defineProps<Props>()
</script>

<template>
  <div class="w-full flex-y-center justify-between">
    <div>
      <span class="pr-8px text-base-text">{{ label }}</span>
      <slot name="suffix" />
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
