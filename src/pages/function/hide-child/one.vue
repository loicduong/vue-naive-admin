<script setup lang="ts">
import LookForward from '@/components/custom/look-forward.vue'

definePage({
  meta: {
    icon: 'material-symbols:filter-list-off',
    hideInMenu: true,
    activeMenu: '/function/hide-child',
  },
})
</script>

<template>
  <LookForward />
</template>

<style scoped></style>
