<script setup lang="ts">
import { $t } from '@/locales'
import ButtonIcon from '@/components/custom/button-icon.vue'
import IconGridiconsFullscreenExit from '~icons/gridicons/fullscreen-exit'
import IconGridiconsFullscreen from '~icons/gridicons/fullscreen'

defineOptions({
  name: 'FullScreen',
})

defineProps<Props>()

interface Props {
  full?: boolean
}
</script>

<template>
  <ButtonIcon :key="String(full)" :tooltip-content="full ? $t('icon.fullscreenExit') : $t('icon.fullscreen')">
    <icon-gridicons-fullscreen-exit v-if="full" />
    <icon-gridicons-fullscreen v-else />
  </ButtonIcon>
</template>

<style scoped></style>
