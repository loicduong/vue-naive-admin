<script setup lang="ts">
import ThemeColor from './modules/theme-color.vue'
import ThemeSchema from './modules/theme-schema.vue'

defineOptions({
  name: 'AppearanceSettings',
})
</script>

<template>
  <div class="flex-col-stretch gap-16px">
    <ThemeSchema />
    <ThemeColor />
  </div>
</template>

<style scoped></style>
