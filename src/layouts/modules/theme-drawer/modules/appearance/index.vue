<script setup lang="ts">
import ThemeColor from './modules/theme-color.vue'
import ThemeRadius from './modules/theme-radius.vue'
import ThemeSchema from './modules/theme-schema.vue'

defineOptions({
  name: 'AppearanceSettings',
})
</script>

<template>
  <div class="flex flex-col items-stretch gap-4">
    <ThemeSchema />
    <ThemeColor />
    <ThemeRadius />
  </div>
</template>

<style scoped></style>
