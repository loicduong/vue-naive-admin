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
  <div class="position-fixed bottom-4px right-14px z-999999 font-size-10px text-[#7689A8]">
    {{ data }}
  </div>
</template>

<style scoped></style>
