<script setup lang="ts">
import { $t } from '@/locales'
import SystemLogo from '@/components/common/system-logo.vue'

defineOptions({
  name: 'GlobalLogo',
})

withDefaults(defineProps<Props>(), {
  showTitle: true,
})

interface Props {
  /** Whether to show the title */
  showTitle?: boolean
}
</script>

<template>
  <RouterLink id="global-logo" to="/" class="w-full flex items-center justify-center overflow-hidden whitespace-nowrap">
    <SystemLogo class="text-[32px] text-primary" />
    <h2 v-show="showTitle" class="pl-2 text-[16px] text-primary font-bold transition duration-300 ease-in-out">
      {{ $t('system.title') }}
    </h2>
  </RouterLink>
</template>

<style scoped></style>
