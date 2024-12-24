<script lang="ts" setup>
import { getPaletteColorByNumber } from '@sa/color'

defineOptions({ name: 'WaveBg' })

interface Props {
  /** Theme color */
  themeColor: string
}

const props = defineProps<Props>()

const lightColor = computed(() => getPaletteColorByNumber(props.themeColor, 300))
const darkColor = computed(() => getPaletteColorByNumber(props.themeColor, 600))
</script>

<template>
  <div
    class="absolute-lt z-1 size-full overflow-hidden"
    :style="`background-color: ${darkColor};background-image: linear-gradient(43deg, ${darkColor} 0%, ${themeColor} 46%, ${lightColor} 100%);`"
  />
</template>

<style scoped></style>
