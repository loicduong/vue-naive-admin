<script lang="ts" setup>
import { getPaletteColorByNumber } from '@/utils/color'
import { computed } from 'vue'

defineOptions({ name: 'WaveBg' })

const props = defineProps<Props>()

interface Props {
  /** Theme color */
  themeColor: string
}

const lightColor = computed(() => getPaletteColorByNumber(props.themeColor, 200))
const darkColor = computed(() => getPaletteColorByNumber(props.themeColor, 500))
</script>

<template>
  <div
    class="absolute left-0 top-0 z-1 size-full overflow-hidden"
    :style="`background-color: ${darkColor};background-image: linear-gradient(43deg, ${darkColor} 0%, ${themeColor} 46%, ${lightColor} 100%);`"
  />
</template>

<style scoped></style>
