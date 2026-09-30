<script setup lang="ts">
import IframePage from '@/components/common/iframe-page.vue'

definePage({
  meta: {
    order: 5,
    icon: 'logos:tailwindcss-icon',
  },
})
</script>

<template>
  <IframePage url="https://tailwindcss.com/" />
</template>
