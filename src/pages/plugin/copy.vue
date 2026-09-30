<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'
import { NButton, NCard, NInput, NInputGroup } from 'naive-ui'

definePage({
  meta: {
    icon: 'mdi:clipboard-outline',
  },
})

const { copy, isSupported } = useClipboard()

const source = ref('')

async function handleCopy() {
  if (!isSupported) {
    window.$message?.error('Your browser does not support the Clipboard API')
    return
  }

  if (!source.value) {
    window.$message?.error('Please enter the content to be copied')
    return
  }

  await copy(source.value)
  window.$message?.success(`Copy successful: ${source.value}`)
}
</script>

<template>
  <div class="h-full">
    <NCard title="Text Copy" :bordered="false" class="h-full rounded-lg shadow-xs">
      <NInputGroup>
        <NInput v-model:value="source" placeholder="Please enter the content to be copied" />
        <NButton type="primary" @click="handleCopy"> Copy </NButton>
      </NInputGroup>
    </NCard>
  </div>
</template>
