<script lang="ts" setup>
import AnimationEdge from '@/components/modules/plugin/flow/animation-edge.vue'
import Icon from '@/components/modules/plugin/flow/icon.vue'
import { initialEdges, initialNodes } from '@/components/modules/plugin/flow/initial-elements'
import { useLayout } from '@/components/modules/plugin/flow/layout'
import ProcessNode from '@/components/modules/plugin/flow/process-node.vue'
import { useRunProcess } from '@/components/modules/plugin/flow/run-process'
import { useShuffle } from '@/components/modules/plugin/flow/shuffle'
import { Background } from '@vue-flow/background'
import { Panel, useVueFlow, VueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

definePage({
  meta: {
    icon: 'mdi:graph',
  },
})

const nodes = ref(initialNodes)

const edges = ref(initialEdges)

const cancelOnError = ref(true)

const shuffle = useShuffle()

const { graph, layout, previousDirection } = useLayout()

const { run, stop, reset, isRunning } = useRunProcess({
  graph,
  cancelOnError,
})

const { fitView } = useVueFlow()

async function shuffleGraph() {
  await stop()

  reset(nodes.value)

  edges.value = shuffle(nodes.value)

  nextTick(() => {
    layoutGraph(previousDirection.value)
  })
}

async function layoutGraph(direction: string) {
  await stop()

  reset(nodes.value)

  nodes.value = layout(nodes.value, edges.value, direction)

  nextTick(() => {
    fitView()
    run(nodes.value)
  })
}
</script>

<template>
  <div class="overflow-hidden">
    <NCard :bordered="false" class="h-full card-wrapper" content-class="overflow-hidden">
      <VueFlow :nodes="nodes" :edges="edges" @nodes-initialized="layoutGraph('LR')">
        <template #node-process="props">
          <ProcessNode
            :data="props.data"
            :source-position="props.sourcePosition"
            :target-position="props.targetPosition"
          />
        </template>

        <template #edge-animation="edgeProps">
          <AnimationEdge
            :id="edgeProps.id"
            :source="edgeProps.source"
            :target="edgeProps.target"
            :source-x="edgeProps.sourceX"
            :source-y="edgeProps.sourceY"
            :targetX="edgeProps.targetX"
            :targetY="edgeProps.targetY"
            :source-position="edgeProps.sourcePosition"
            :target-position="edgeProps.targetPosition"
          />
        </template>

        <Background />

        <Panel class="process-panel" position="top-left">
          <div class="layout-panel">
            <button v-if="isRunning" class="stop-btn" title="stop" @click="stop">
              <Icon name="stop" />
              <span class="spinner" />
            </button>
            <button v-else title="start" @click="run(nodes)">
              <Icon name="play" />
            </button>

            <button title="set horizontal layout" @click="layoutGraph('LR')">
              <Icon name="horizontal" />
            </button>

            <button title="set vertical layout" @click="layoutGraph('TB')">
              <Icon name="vertical" />
            </button>

            <button title="shuffle graph" @click="shuffleGraph">
              <Icon name="shuffle" />
            </button>
          </div>
        </Panel>
      </VueFlow>
    </NCard>
  </div>
</template>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.process-panel,
.layout-panel {
  display: flex;
  gap: 10px;
}

.process-panel {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #2d3748;
  border-radius: 8px;
  box-shadow: 0 0 10px rgb(0 0 0 / 50%);
}

.process-panel button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  background-color: #4a5568;
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 10px rgb(0 0 0 / 50%);
}

/* .checkbox-panel {
  display: flex;
  align-items: center;
  gap: 10px;
} */

.process-panel button:hover,
.layout-panel button:hover {
  background-color: #2563eb;
  transition: background-color 0.2s;
}

.process-panel label {
  font-size: 12px;
  color: white;
}

.stop-btn svg {
  display: none;
}

.stop-btn:hover svg {
  display: block;
}

.stop-btn:hover .spinner {
  display: none;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
</style>
