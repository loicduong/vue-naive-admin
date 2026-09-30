<script setup lang="ts">
import GlobalSettings from './modules/global-settings.vue'

defineOptions({
  name: 'GeneralSettings',
})
</script>

<template>
  <div class="flex flex-col items-stretch gap-4">
    <GlobalSettings />
  </div>
</template>

<style scoped></style>
