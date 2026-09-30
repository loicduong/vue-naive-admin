<script setup lang="ts">
import { $t } from '@/locales'
import { NCard } from 'naive-ui'
import IconLocalBanner from '~icons/local/banner'

defineOptions({
  name: 'CreativityBanner',
})
</script>

<template>
  <NCard :title="$t('page.home.creativity')" :bordered="false" size="small" class="h-full rounded-lg shadow-xs">
    <div class="h-full flex items-center justify-center">
      <icon-local-banner class="text-[400px] text-primary sm:text-[320px]" />
    </div>
  </NCard>
</template>

<style scoped></style>
