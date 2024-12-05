<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css' // Optional Theme applied to the Data Grid

definePage({ meta: { icon: 'icon-park-outline:table' } })

const rowData = ref([
  { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
  { make: 'Fiat', model: '500', price: 15774, electric: false },
  { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
])

const colDefs = ref([
  { field: 'make' },
  { field: 'model' },
  { field: 'price' },
  { field: 'electric' },
])
</script>

<template>
  <div class="h-full">
    <NCard title="AG Grid Table" :bordered="false" class="h-full card-wrapper">
      <GithubLink link="https://github.com/ag-grid/ag-grid" class="mb-4" />
      <AgGridVue
        class="ag-theme-quartz-dark h-full w-full"
        :column-defs="colDefs"
        :row-data="rowData"
        :default-col-def="{ flex: 1 }"
      />
    </NCard>
  </div>
</template>
