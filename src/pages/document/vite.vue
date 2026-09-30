<script setup lang="ts">
import IframePage from '@/components/common/iframe-page.vue'

definePage({
  meta: {
    order: 4,
    icon: 'logos:vitejs',
  },
})
</script>

<template>
  <IframePage url="https://vite.dev/" />
</template>
