<script setup lang="ts">
import type { JSONDataType } from 'vue-json-pretty/types/utils'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

interface Props {
  graphData: JSONDataType
}

defineProps<Props>()
</script>

<template>
  <VueJsonPretty
    path="res"
    :deep="3"
    :show-length="true"
    :data="graphData"
  />
</template>
