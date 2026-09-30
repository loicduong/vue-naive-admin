<script setup lang="ts">
import {
  barMarkPointSpec,
  circularProgressTickSpec,
  histogramDifferentBinSpec,
  liquidChartSmartInvertSpec,
  rankingBarSpec,
  shapeWordCloudSpec,
  stackedDashAreaSpec,
} from '@/components/modules/plugin/charts/vchart/data'
import { useVChart } from '@/hooks/common/vchart'
import { NCard, NSpace } from 'naive-ui'
import WebSiteLink from '@/components/custom/web-site-link.vue'

definePage({
  meta: {
    localIcon: 'visactor',
  },
})

const { domRef: stackedDashAreaRef } = useVChart(() => stackedDashAreaSpec)
const { domRef: barMarkPointRef } = useVChart(() => barMarkPointSpec)
const { domRef: histogramDifferentBinRef } = useVChart(() => histogramDifferentBinSpec)
const { domRef: rankingBarRef } = useVChart(() => rankingBarSpec)
const { domRef: shapeWordCloudRef } = useVChart(() => shapeWordCloudSpec)
const { domRef: circularProgressTickRef } = useVChart(() => circularProgressTickSpec)
const { domRef: liquidChartSmartInvertRef } = useVChart(() => liquidChartSmartInvertSpec)
</script>

<template>
  <NSpace vertical :size="16">
    <NCard :bordered="false" title="VChart" class="h-full rounded-lg shadow-xs">
      <WebSiteLink label="More Demos: " link="https://www.visactor.com/vchart/example" />
    </NCard>
    <NCard title="Stacked Dash Area Chart" :bordered="false" class="h-full rounded-lg shadow-xs">
      <div ref="stackedDashAreaRef" class="h-100" />
    </NCard>
    <NCard title="Bar Mark Point Chart" :bordered="false" class="h-full rounded-lg shadow-xs">
      <div ref="barMarkPointRef" class="h-100" />
    </NCard>
    <NCard title="Histogram Different Bin Chart" :bordered="false" class="h-full rounded-lg shadow-xs">
      <div ref="histogramDifferentBinRef" class="h-100" />
    </NCard>
    <NCard title="Ranking Bar Chart" :bordered="false" class="h-full rounded-lg shadow-xs">
      <div ref="rankingBarRef" class="h-100" />
    </NCard>
    <NCard title="Circular Progress Tick Chart" :bordered="false" class="h-full rounded-lg shadow-xs">
      <div ref="circularProgressTickRef" class="h-100" />
    </NCard>
    <NCard title="Liquid Chart Smart Invert Chart" :bordered="false" class="h-full rounded-lg shadow-xs">
      <div ref="liquidChartSmartInvertRef" class="h-100" />
    </NCard>
    <NCard title="Shape Word Cloud Chart" :bordered="false" class="h-full rounded-lg shadow-xs">
      <div ref="shapeWordCloudRef" class="h-100" />
    </NCard>
  </NSpace>
</template>

<style scoped></style>
