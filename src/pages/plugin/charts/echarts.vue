<script setup lang="ts">
import {
  barOptions,
  gaugeOptions,
  getPictorialBarOption,
  getScatterOption,
  lineOptions,
  pieOptions,
  radarOptions,
} from '@/components/modules/plugin/charts/echarts/data'
import { useEcharts } from '@/hooks/common/echarts'
import { onUnmounted } from 'vue'
import { NCard, NSpace } from 'naive-ui'

definePage({
  meta: {
    icon: 'simple-icons:apacheecharts',
  },
})

const { domRef: pieRef } = useEcharts(() => pieOptions, { onRender() {} })
const { domRef: lineRef } = useEcharts(() => lineOptions, { onRender() {} })
const { domRef: barRef } = useEcharts(() => barOptions, { onRender() {} })
const { domRef: pictorialBarRef } = useEcharts(() => getPictorialBarOption(), { onRender() {} })
const { domRef: radarRef } = useEcharts(() => radarOptions, { onRender() {} })
const { domRef: scatterRef } = useEcharts(() => getScatterOption(), { onRender() {} })
const { domRef: gaugeRef, setOptions: setGaugeOptions } = useEcharts(() => gaugeOptions, { onRender() {} })

let intervalId: NodeJS.Timeout

function initGaugeChart() {
  intervalId = setInterval(() => {
    const date = new Date()
    const second = date.getSeconds()
    const minute = date.getMinutes() + second / 60
    const hour = (date.getHours() % 12) + minute / 60

    setGaugeOptions({
      animationDurationUpdate: 300,
      series: [
        {
          name: 'hour',
          animation: hour !== 0,
          data: [{ value: hour }],
        },
        {
          name: 'minute',
          animation: minute !== 0,
          data: [{ value: minute }],
        },
        {
          animation: second !== 0,
          name: 'second',
          data: [{ value: second }],
        },
      ],
    })
  }, 1000)
}

function clearGaugeChart() {
  clearInterval(intervalId)
}

initGaugeChart()

onUnmounted(() => {
  clearGaugeChart()
})
</script>

<template>
  <NSpace vertical :size="16">
    <NCard :bordered="false" class="rounded-lg shadow-xs">
      <div ref="pieRef" class="h-100" />
    </NCard>
    <NCard :bordered="false" class="rounded-lg shadow-xs">
      <div ref="lineRef" class="h-100" />
    </NCard>
    <NCard :bordered="false" class="rounded-lg shadow-xs">
      <div ref="barRef" class="h-100" />
    </NCard>
    <NCard :bordered="false" class="rounded-lg shadow-xs">
      <div ref="radarRef" class="h-100" />
    </NCard>
    <NCard :bordered="false" class="rounded-lg shadow-xs">
      <div ref="scatterRef" class="h-150" />
    </NCard>
    <NCard :bordered="false" class="rounded-lg shadow-xs">
      <div ref="pictorialBarRef" class="h-150" />
    </NCard>
    <NCard :bordered="false" class="rounded-lg shadow-xs">
      <div ref="gaugeRef" class="h-160" />
    </NCard>
  </NSpace>
</template>

<style scoped></style>
