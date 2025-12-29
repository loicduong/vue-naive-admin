<script setup lang="tsx">
import type { CustomBehaviorOption, IPointerEvent } from '@antv/g6'
import type { CustomGraphData } from '@/components/modules/plugin/charts/antv/types'
import AntvFlow from '@/components/modules/plugin/charts/antv/antv-flow.vue'
import { getFlowData } from '@/components/modules/plugin/charts/antv/data'

definePage({
  meta: {
    icon: 'hugeicons:flow-square',
  },
})

const antvFlowRef = useTemplateRef('antvFlowRef')

const flowData = ref({
  nodes: [],
  edges: [],
}) as Ref<CustomGraphData>

const selectedNode = ref<string | undefined>('N2')

const behaviors: CustomBehaviorOption[] = [
  {
    type: 'click-select',
    enable: (event: IPointerEvent) => event.targetType === 'node',
    onClick: (event: IPointerEvent) => {
      const node = event.target as unknown as HTMLElement
      const nodeData = flowData.value.nodes.find(item => item.id === node.id)
      selectedNode.value = nodeData?.id
      window.$message?.success(`Selected Node: [${node.id}]${nodeData?.name}`)
    },
  },
]
const hasNodeN = computed(() => flowData.value.nodes.some(node => node.id === 'NN'))

function addNode() {
  const { nodes, edges } = flowData.value

  nodes.push({ id: 'NN', name: 'New node', status: 'NOT_STARTED' })
  edges.push({ id: 'EN', source: 'N5', target: 'NN' })
  flowData.value = { nodes, edges }
}

function removeNode(id: string) {
  const { nodes, edges } = flowData.value
  // When deleting a node, it is also necessary to delete the edges that contain NX
  flowData.value = {
    nodes: nodes.filter(node => node.id !== id),
    edges: edges.filter(edge => edge.source !== id && edge.target !== id),
  }
}

onMounted(() => {
  flowData.value = getFlowData()
})
</script>

<template>
  <div class="h-full">
    <NCard title="AntV G6 Next" :bordered="false" class="h-full card-wrapper">
      <AntvFlow ref="antvFlowRef" :data="flowData" :selected="selectedNode" :behaviors="behaviors" />
      <NDivider />
      <NFlex>
        <NButton @click="selectedNode = 'N5'">
          Select node N5 (you need to handle the selection event yourself, it will not trigger the element click)
        </NButton>
        <NButton v-if="!hasNodeN" @click="addNode">
          Add a node and connect it to Node 5
        </NButton>
        <NButton v-else @click="() => removeNode('NN')">
          Delete the newly added node
        </NButton>
        <NButton @click="() => removeNode('NX')">
          Delete NodeX
        </NButton>
      </NFlex>
    </NCard>
  </div>
</template>
