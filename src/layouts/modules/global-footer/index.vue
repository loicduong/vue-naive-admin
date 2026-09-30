<script setup lang="ts">
import DarkModeContainer from '@/components/common/dark-mode-container.vue'

defineOptions({
  name: 'GlobalFooter',
})
</script>

<template>
  <DarkModeContainer class="h-full flex items-center justify-center">
    <a
      href="https://github.com/loicduong/naive-agentic-admin/blob/main/LICENSE"
      target="_blank"
      rel="noopener noreferrer"
    >
      Copyright MIT © 2024 Loic Duong
    </a>
  </DarkModeContainer>
</template>

<style scoped></style>
