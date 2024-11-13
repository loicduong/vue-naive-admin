<script setup lang="ts">
interface Props {
  url: string
}

definePage({
  meta: {
    constant: true,
    hideInMenu: true,
    keepAlive: true,
  },
})

defineProps<Props>()

onMounted(() => {
  console.error('mounted')
})

onActivated(() => {
  console.error('activated')
})
</script>

<template>
  <div class="h-full">
    <iframe id="iframePage" class="size-full" :src="url" />
  </div>
</template>

<style scoped></style>
