<script setup lang="ts">
defineOptions({ name: 'WebSiteLink' })

defineProps<Props>()

interface Props {
  /** Web site name */
  label: string
  /** Web site link */
  link: string
}
</script>

<template>
  <p>
    <span>{{ label }}</span>
    <a class="text-blue-500" :href="link" target="#">
      {{ link }}
    </a>
  </p>
</template>

<style scoped></style>
