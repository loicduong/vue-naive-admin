<script setup lang="ts">
import LookForward from '@/components/custom/look-forward.vue'

definePage({
  meta: {
    hideInMenu: true,
    roles: ['R_ADMIN'],
    activeMenu: '/manage/user',
  },
  props: true,
})
</script>

<template>
  <LookForward />
</template>

<style scoped></style>
