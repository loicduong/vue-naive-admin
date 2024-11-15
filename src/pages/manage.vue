<script setup lang="ts">
definePage({
  meta: {
    icon: 'carbon:cloud-service-management',
    order: 9,
    roles: ['R_ADMIN'],
  },
})
</script>

<template>
  <RouterView />
</template>
