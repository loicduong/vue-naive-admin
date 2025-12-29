<script setup lang="ts">
import { getPaletteColorByNumber } from '@sa/color'
import { useEcharts } from '@/hooks/common/echarts'
import { $t } from '@/locales'
import { useAppStore } from '@/store/modules/app'
import { useThemeStore } from '@/store/modules/theme'

defineOptions({ name: 'LineChart' })

const themeStore = useThemeStore()

const appStore = useAppStore()

const lightColor = computed(() => getPaletteColorByNumber(themeStore.themeColor, 300))

const { domRef, updateOptions } = useEcharts(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: { backgroundColor: '#6a7985' },
    },
  },
  legend: {
    data: [$t('page.home.downloadCount'), $t('page.home.registerCount')],
    top: '0',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '15%',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [] as string[],
  },
  yAxis: { type: 'value' },
  series: [
    {
      color: themeStore.themeColor,
      name: $t('page.home.downloadCount'),
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: themeStore.themeColor,
            },
            {
              offset: 1,
              color: '#fff',
            },
          ],
        },
      },
      emphasis: { focus: 'series' },
      data: [] as number[],
    },
    {
      color: lightColor.value,
      name: $t('page.home.registerCount'),
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: lightColor.value,
            },
            {
              offset: 1,
              color: '#fff',
            },
          ],
        },
      },
      emphasis: { focus: 'series' },
      data: [],
    },
  ],
}))

async function mockData() {
  await new Promise(resolve => (setTimeout(resolve, 1000)))

  updateOptions((opts) => {
    opts.xAxis.data = [
      '06:00',
      '08:00',
      '10:00',
      '12:00',
      '14:00',
      '16:00',
      '18:00',
      '20:00',
      '22:00',
      '24:00',
    ]
    opts.series[0].data = [4623, 6145, 6268, 6411, 1890, 4251, 2978, 3880, 3606, 4311]
    opts.series[1].data = [2208, 2016, 2916, 4512, 8281, 2008, 1963, 2367, 2956, 678]

    return opts
  })
}

function updateLocale() {
  updateOptions((opts, factory) => {
    const originOpts = factory()

    opts.legend.data = originOpts.legend.data
    opts.series[0].name = originOpts.series[0].name
    opts.series[1].name = originOpts.series[1].name

    return opts
  })
}

const init = async () => (await mockData())

watch(() => appStore.locale, () => (updateLocale()))

watch(
  () => themeStore.themeColor,
  () => {
    updateOptions((opts) => {
      opts.series[0].color = themeStore.themeColor
      opts.series[1].color = lightColor.value
      opts.series[0].areaStyle.color.colorStops[0].color = themeStore.themeColor
      opts.series[1].areaStyle.color.colorStops[0].color = lightColor.value

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
