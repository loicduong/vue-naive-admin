<script setup lang="ts">
import { reactive, watch } from 'vue'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

definePage({ meta: { icon: 'mdi:code-json' } })

const defaultData = {
  status: 200,
  text: '',
  error: null,
  config: undefined,
  data: [
    {
      news_id: 51184,
      title: 'iPhone X Review: Innovative future with real black technology',
      source: 'Netease phone',
    },
    {
      news_id: 51183,
      title:
        'Traffic paradise: How to design streets for people and unmanned vehicles in the future?',
      source: 'Netease smart',
      link: 'http://netease.smart/traffic-paradise/1235',
    },
    {
      news_id: 51182,
      title:
        'Teslamask\'s American Business Relations: The government does not pay billions to build factories',
      source: 'AI Finance',
      members: ['Daniel', 'Mike', 'John'],
    },
  ],
}

const state = reactive({
  val: JSON.stringify(defaultData),
  data: defaultData,
  showLine: true,
  showLineNumber: true,
  showDoubleQuotes: true,
  showLength: true,
  editable: true,
  showIcon: true,
  editableTrigger: 'click',
  deep: 3,
})

watch(
  () => state.val,
  (newVal) => {
    try {
      state.data = JSON.parse(newVal)
    }
    catch {}
  },
)

watch(
  () => state.data,
  (newVal) => {
    try {
      state.val = JSON.stringify(newVal)
    }
    catch {}
  },
)
</script>

<template>
  <div class="overflow-hidden">
    <NCard
      title="Vue JSON Pretty"
      :bordered="false"
      size="small"
      content-class="overflow-y-hidden overflow-x-auto"
      class="h-full card-wrapper"
    >
      <GithubLink link="https://github.com/leezng/vue-json-pretty" class="mb-4" />
      <VueJsonPretty
        v-model:data="state.data"
        :deep="state.deep"
        :show-double-quotes="state.showDoubleQuotes"
        :show-line="state.showLine"
        :show-length="state.showLength"
        :show-icon="state.showIcon"
        :show-line-number="state.showLineNumber"
        :editable="state.editable"
        :editable-trigger="state.editableTrigger as any"
      />
    </NCard>
  </div>
</template>
