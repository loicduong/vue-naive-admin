<script setup lang="ts">
import ExceptionBase from '@/components/common/exception-base.vue'

definePage({
  meta: {
    constant: true,
    hideInMenu: true,
    layout: 'blank',
  },
})
</script>

<template>
  <ExceptionBase type="404" />
</template>

<style scoped></style>
