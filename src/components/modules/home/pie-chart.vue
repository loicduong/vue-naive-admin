<script setup lang="ts">
import { useEcharts } from '@/hooks/common/echarts'
import { $t } from '@/locales'
import { useAppStore } from '@/store/modules/app'
import { useThemeStore } from '@/store/modules/theme'
import { getPaletteColorByNumber } from '@sa/color'

defineOptions({ name: 'PieChart' })

const themeStore = useThemeStore()

const appStore = useAppStore()

const colors = computed(() => {
  const lightColor = getPaletteColorByNumber(themeStore.themeColor, 300)
  const darkColor = getPaletteColorByNumber(themeStore.themeColor, 700)
  const darkestColor = getPaletteColorByNumber(themeStore.themeColor, 900)

  return [lightColor, themeStore.themeColor, darkColor, darkestColor]
})

const { domRef, updateOptions } = useEcharts(() => ({
  tooltip: { trigger: 'item' },
  legend: {
    bottom: '1%',
    left: 'center',
    itemStyle: { borderWidth: 0 },
  },
  series: [
    {
      color: colors.value,
      name: $t('page.home.schedule'),
      type: 'pie',
      radius: ['45%', '75%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '12',
        },
      },
      labelLine: { show: false },
      data: [] as { name: string, value: number }[],
    },
  ],
}))

async function mockData() {
  await new Promise(resolve => (setTimeout(resolve, 1000)))

  updateOptions((opts) => {
    opts.series[0].data = [
      { name: $t('page.home.study'), value: 20 },
      { name: $t('page.home.entertainment'), value: 10 },
      { name: $t('page.home.work'), value: 40 },
      { name: $t('page.home.rest'), value: 30 },
    ]

    return opts
  })
}

function updateLocale() {
  updateOptions((opts, factory) => {
    const originOpts = factory()

    opts.series[0].name = originOpts.series[0].name

    opts.series[0].data = [
      { name: $t('page.home.study'), value: 20 },
      { name: $t('page.home.entertainment'), value: 10 },
      { name: $t('page.home.work'), value: 40 },
      { name: $t('page.home.rest'), value: 30 },
    ]

    return opts
  })
}

const init = async () => (await mockData())

watch(() => appStore.locale, () => (updateLocale()))

watch(
  () => themeStore.themeColor,
  () => {
    updateOptions((opts) => {
      opts.series[0].color = colors.value

      return opts
    })
  },
)

init()
</script>

<template>
  <NCard :bordered="false" class="card-wrapper">
    <div ref="domRef" class="h-360px overflow-hidden" />
  </NCard>
</template>

<style scoped></style>
