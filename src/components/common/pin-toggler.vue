<script lang="ts" setup>
import { $t } from '@/locales'

defineOptions({ name: 'PinToggler' })

const props = defineProps<Props>()

interface Props {
  pin?: boolean
}

const icon = computed(() => (props.pin ? 'mdi-pin-off' : 'mdi-pin'))
</script>

<template>
  <ButtonIcon
    :tooltip-content="pin ? $t('icon.unpin') : $t('icon.pin')"
    tooltip-placement="bottom-start"
    :z-index="100"
  >
    <SvgIcon :icon="icon" />
  </ButtonIcon>
</template>

<style scoped></style>
