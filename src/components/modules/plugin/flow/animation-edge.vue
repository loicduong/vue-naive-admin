<script lang="ts" setup>
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  Position,
  useNodesData,
  useVueFlow,
} from '@vue-flow/core'
import { executeTransition, TransitionPresets } from '@vueuse/core'

interface Props {
  id: string
  source: string
  target: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition?: Position
  targetPosition?: Position
}

const props = withDefaults(defineProps<Props>(), {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
})

const { findEdge } = useVueFlow()

const nodesData = useNodesData([props.target, props.source])

const edgePoint = ref(0)

const edgeRef = ref()

const labelPosition = ref({ x: 0, y: 0 })

const currentLength = ref(0)

const targetNodeData = toRef(() => nodesData.value[0].data)

const sourceNodeData = toRef(() => nodesData.value[1].data)

const isFinished = toRef(() => sourceNodeData.value.isFinished)

const isCancelled = toRef(() => targetNodeData.value.isCancelled)

const isAnimating = ref(false)

const edgeColor = toRef(() => {
  if (targetNodeData.value.hasError) {
    return '#f87171'
  }

  if (targetNodeData.value.isFinished) {
    return '#42B983'
  }

  if (targetNodeData.value.isCancelled || targetNodeData.value.isSkipped) {
    return '#fbbf24'
  }

  if (targetNodeData.value.isRunning || isAnimating.value) {
    return '#2563eb'
  }

  return '#6b7280'
})

const path = computed(() =>
  getSmoothStepPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition,
  }),
)

watch(isCancelled, (isCancelled) => {
  if (isCancelled) {
    reset()
  }
})

watch(isAnimating, (isAnimating) => {
  const edge = findEdge(props.id)

  if (edge) {
    edge.data = {
      ...edge.data,
      isAnimating,
    }
  }
})

watch(edgePoint, (point) => {
  const pathEl = edgeRef.value?.pathEl

  if (!pathEl || point === 0 || !isAnimating.value) {
    return
  }

  const nextLength = pathEl.getTotalLength()

  if (currentLength.value !== nextLength) {
    runAnimation()
    return
  }

  labelPosition.value = pathEl.getPointAtLength(point)
})

watch(isFinished, (isFinished) => {
  if (isFinished) {
    runAnimation()
  }
})

async function runAnimation() {
  const pathEl = edgeRef.value?.pathEl

  if (!pathEl) {
    return
  }

  const totalLength = pathEl.getTotalLength()

  const from = edgePoint.value || 0

  labelPosition.value = pathEl.getPointAtLength(from)

  isAnimating.value = true

  if (currentLength.value !== totalLength) {
    currentLength.value = totalLength
  }

  await executeTransition(edgePoint, from, totalLength, {
    transition: TransitionPresets.easeInOutCubic,
    duration: Math.max(1500, totalLength / 2),
    abort: () => !isAnimating.value,
  })

  reset()
}

function reset() {
  nextTick(() => {
    edgePoint.value = 0
    currentLength.value = 0
    labelPosition.value = { x: 0, y: 0 }
    isAnimating.value = false
  })
}
</script>

<template>
  <BaseEdge
    :id="id"
    ref="edgeRef"
    :path="path[0]"
    :style="{ stroke: edgeColor }"
  />

  <EdgeLabelRenderer v-if="isAnimating">
    <div
      :style="{
        transform: `translate(-50%, -50%) translate(${labelPosition.x}px,${labelPosition.y}px)`,
      }"
      class="nodrag nopan animated-edge-label"
    >
      <span class="truck">
        <span class="box">📦</span>
        🚚
      </span>
    </div>
  </EdgeLabelRenderer>
</template>

<style scoped>
.animated-edge-label {
  position: absolute;
  z-index: 100;
}

.truck {
  position: relative;
  display: inline-block;
  transform: scaleX(-1);
}

.box {
  position: absolute;
  top: -10px;
}
</style>
