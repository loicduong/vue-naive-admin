<script setup lang="ts">
defineOptions({
  name: 'GlobalBuildDesc',
})

defineProps<Props>()

interface Props {
  data: string
}
</script>

<template>
  <div class="fixed bottom-1 right-3.5 z-999999 text-[10px] text-[#7689A8]">
    {{ data }}
  </div>
</template>

<style scoped></style>
