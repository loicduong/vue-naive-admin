<script setup lang="ts">
import IframePage from '@/components/common/iframe-page.vue'

definePage({
  meta: {
    order: 5,
    icon: 'logos:unocss',
  },
})
</script>

<template>
  <IframePage url="https://unocss.dev/" />
</template>
