<script setup lang="ts">
import type { LogicFlow as LF } from '@logicflow/core'
import { toLogicflowData } from '@/components/modules/plugin/flow/logic-flow/adpter-for-turbo'
import { BpmnNode } from '@/components/modules/plugin/flow/logic-flow/config'
import Control from '@/components/modules/plugin/flow/logic-flow/control.vue'
import DataDialog from '@/components/modules/plugin/flow/logic-flow/data-dialog.vue'
import demoData from '@/components/modules/plugin/flow/logic-flow/data-turbo.json'
import NodePanel from '@/components/modules/plugin/flow/logic-flow/node-panel.vue'
import LogicFlow from '@logicflow/core'
import { BpmnElement, Menu, Snapshot } from '@logicflow/extension'
import '@logicflow/core/dist/index.css'
import '@logicflow/extension/dist/index.css'

definePage({
  meta: {
    icon: 'ep:set-up',
  },
})

const lf = ref<LF>()
const graphData = ref<LogicFlow.GraphData | null>(null)
const dataVisible = ref<boolean>(false)
const config = ref({
  grid: true,
  background: {
    color: '#f7f9ff',
  },
  keyboard: {
    enabled: true,
  },
})
const nodeList = BpmnNode

function initLf() {
  // Canvas configuration
  LogicFlow.use(Snapshot)
  // Use bpmn plugin to import bpmn elements that can be used after conversion in turbo
  LogicFlow.use(BpmnElement)
  // Enable right-click menu
  LogicFlow.use(Menu)
  const domLf = new LogicFlow({
    ...unref(config),
    container: document.querySelector('#turbo') as HTMLElement,
  })
  lf.value = domLf
  // Set edge type bpmn:sequenceFlow as default type
  unref(lf)?.setDefaultEdgeType('bpmn:sequenceFlow')
  onRender()
}

function onRender() {
  // Convert Turbo data to LogicFlow internal data structure
  const lFData = toLogicflowData(demoData as unknown as { flowElementList: LogicFlow.GraphElement[] })
  lf.value?.render(lFData)
}

function catData() {
  graphData.value = unref(lf)?.getGraphData() as LogicFlow.GraphData
  dataVisible.value = true
}

onMounted(() => {
  initLf()
})
</script>

<template>
  <div class="overflow-hidden">
    <NCard title="Logic Flow" :bordered="false" class="h-full card-wrapper" content-class="overflow-hidden">
      <!--
 <template #header>
      <div class="card-header">
        <span class="font-medium">
          流程图组件，采用开源的
          <NLink
            href="https://site.logic-flow.cn/docs/#/zh/guide/start"
            target="_blank"
            style="margin: 0 4px 5px; font-size: 16px"
          >
            LogicFlow
          </NLink>
        </span>
      </div>
      <NLink
        class="mt-2"
        href="https://github.com/pure-admin/vue-pure-admin/blob/main/src/views/flow-chart"
        target="_blank"
        rel="noopener noreferrer"
      >
        代码位置 src/views/flow-chart
      </NLink>
    </template>
-->
      <div class="relative h-full">
        <!-- Auxiliary Toolbar -->
        <Control
          v-if="lf"
          class="absolute right-5 top-2.5 z-2"
          :lf="lf"
          :cat-turbo-data="false"
          @cat-data="catData"
        />
        <!-- Node Panel -->
        <NodePanel v-if="lf" :lf="lf" :node-list="nodeList" />
        <!-- Canvas -->
        <div id="turbo" class="h-full" />
        <!-- Data View Panel -->
        <NModal
          v-model:show="dataVisible"
          class="flow-dialog h-85vh w-1/2"
          content-class="overflow-hidden"
          preset="card"
          title="Data"
        >
          <NScrollbar>
            <DataDialog :graph-data="graphData" />
          </NScrollbar>
        </NModal>
      </div>
    </NCard>
  </div>
</template>

<style scoped></style>
