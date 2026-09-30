<script setup lang="ts">
import { $t } from '@/locales'
import ButtonIcon from '@/components/custom/button-icon.vue'
import IconAntDesignReloadOutlined from '~icons/ant-design/reload-outlined'

defineOptions({
  name: 'ReloadButton',
})

defineProps<Props>()

interface Props {
  loading?: boolean
}
</script>

<template>
  <ButtonIcon :tooltip-content="$t('icon.reload')">
    <icon-ant-design-reload-outlined :class="{ 'animate-spin [animation-duration:750ms]': loading }" />
  </ButtonIcon>
</template>

<style scoped></style>
