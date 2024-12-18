<script setup lang="ts">
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { AgGridVue } from 'ag-grid-vue3'

definePage({ meta: { icon: 'icon-park-outline:table' } })

ModuleRegistry.registerModules([AllCommunityModule])

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
      <div class="h-full flex flex-col">
        <GithubLink link="https://github.com/ag-grid/ag-grid" class="mb-4" />
        <AgGridVue
          class="h-full w-full"
          :column-defs="colDefs"
          :row-data="rowData"
          :default-col-def="{ flex: 1 }"
        />
      </div>
    </NCard>
  </div>
</template>
