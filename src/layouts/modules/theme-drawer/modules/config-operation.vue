<script setup lang="ts">
import { $t } from '@/locales'
import { useThemeStore } from '@/store/modules/theme'

defineOptions({ name: 'ConfigOperation' })

const themeStore = useThemeStore()

const { copy, isSupported } = useClipboard()

function getClipboardText() {
  const reg = /"\w+":/g

  const json = themeStore.settingsJson

  return json.replace(reg, match => match.replace(/"/g, ''))
}

function handleReset() {
  themeStore.resetStore()

  setTimeout(() => {
    window.$message?.success($t('theme.configOperation.resetSuccessMsg'))
  }, 50)
}

const dataClipboardText = computed(() => getClipboardText())

async function handleCopy() {
  if (!isSupported) {
    window.$message?.error('Your browser does not support the Clipboard API')
    return
  }

  await copy(dataClipboardText.value)

  window.$message?.success($t('theme.configOperation.copySuccessMsg'))
}
</script>

<template>
  <div class="w-full flex justify-between">
    <NButton type="error" ghost @click="handleReset">
      {{ $t('theme.configOperation.resetConfig') }}
    </NButton>
    <NButton type="primary" @click="handleCopy">
      {{ $t('theme.configOperation.copyConfig') }}
    </NButton>
  </div>
</template>

<style scoped></style>
