<script setup lang="ts">
definePage({
  meta: {
    icon: 'mdi:monitor-dashboard',
    order: 1,
  },
})
</script>

<template>
  <div class="overflow-hidden">
    <NCard :bordered="false" class="h-full card-wrapper" content-class="overflow-hidden">
      <div class="h-full w-full flex items-center justify-center">
        <h1 class="text-2xl font-bold">
          Welcome to the Vue Naive Admin
        </h1>
      </div>
    </NCard>
  </div>
</template>

<style scoped></style>
