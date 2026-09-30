<script setup lang="ts">
import { $t } from '@/locales'
import SvgIcon from '@/components/custom/svg-icon.vue'

defineOptions({
  name: 'LookForward',
})
</script>

<template>
  <div class="size-full min-h-130 flex flex-col items-center justify-center gap-6 overflow-hidden">
    <div class="flex text-[400px] text-primary">
      <SvgIcon local-icon="expectation" />
    </div>
    <slot>
      <h3 class="text-[28px] text-primary font-medium">
        {{ $t('common.lookForward') }}
      </h3>
    </slot>
  </div>
</template>

<style scoped></style>
