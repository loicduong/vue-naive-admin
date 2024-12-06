<script setup lang="ts">
import * as d3 from 'd3'

definePage({ meta: { icon: 'file-icons:d3' } })

const containerRef = useTemplateRef('container')
const width = ref(0)
const height = ref(0)
const marginTop = ref(20)
const marginRight = ref(20)
const marginBottom = ref(20)
const marginLeft = ref(20)

const data = ref(d3.ticks(-2, 2, 200).map(Math.sin))

const x = computed(() => d3.scaleLinear(
  [0, data.value.length - 1],
  [marginLeft.value, width.value - marginRight.value],
))

const y = computed(() => d3.scaleLinear(
  d3.extent(data.value) as [number, number],
  [height.value - marginBottom.value, marginTop.value],
))

const line = computed(() => d3.line(
  (d: number, i: number) => x.value(i),
  y.value,
))

function handleMousemove(event: MouseEvent) {
  const [xPos, yPos] = d3.pointer(event)
  data.value = data.value.slice(-200).concat(Math.atan2(xPos, yPos))
}

function updateDimensions() {
  if (containerRef.value) {
    width.value = containerRef.value.clientWidth
    height.value = containerRef.value.clientHeight
  }
}

onMounted(() => {
  updateDimensions()
  useEventListener('resize', updateDimensions)
})
</script>

<template>
  <div class="h-full">
    <NCard title="D3 Chart" :bordered="false" class="h-full card-wrapper">
      <div class="h-full flex-col-stretch">
        <GithubLink link="https://github.com/d3/d3" class="mb-4" />
        <div ref="container" class="h-full flex-col-stretch" @mousemove="handleMousemove">
          <svg :width="width" :height="height">
            <path fill="none" stroke="currentColor" strokeWidth="1.5" :d="line(data) ?? ''" />
            <g fill="white" stroke="currentColor" strokeWidth="1.5">
              <circle v-for="(d, i) in data" :key="i" :cx="x(i)" :cy="y(d)" r="2.5" />
            </g>
          </svg>
        </div>
      </div>
    </NCard>
  </div>
</template>
