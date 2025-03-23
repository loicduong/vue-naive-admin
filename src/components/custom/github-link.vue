<script setup lang="ts">
import WebSiteLink from './web-site-link.vue'

defineOptions({ name: 'GithubLink' })

defineProps<Props>()

interface Props {
  /** github link */
  link: string
}
</script>

<template>
  <WebSiteLink label="GitHub address: " :link="link" />
</template>

<style scoped></style>
