<script lang="ts" setup>
import printJS from 'print-js'

definePage({
  meta: {
    icon: 'mdi:printer',
  },
})

function printTable() {
  printJS({
    printable: [
      { name: 'loicduong', github: 'loicduong', remark: 'Welcome to the technical exchange' },
      { name: 'loicduong', github: 'loicduong', remark: 'Welcome to the technical exchange' },
    ],
    properties: ['name', 'github', 'remark'],
    type: 'json',
  })
}
function printImage() {
  printJS({
    printable: [
      'https://file-examples.com/storage/fec85039006734629a992d7/2017/10/file_example_JPG_100kB.jpg',
      'https://file-examples.com/storage/fec85039006734629a992d7/2017/10/file_example_JPG_100kB.jpg',
    ],
    type: 'image',
    header: 'Multiple Images',
    imageStyle: 'width:100%;',
  })
}
</script>

<template>
  <div class="h-full">
    <NCard title="Print" :bordered="false" class="card-wrapper">
      <NButton type="primary" class="mr-10px" @click="printTable">
        Print form
      </NButton>
      <NButton type="primary" @click="printImage">
        Print image
      </NButton>
      <template #footer>
        <GithubLink label="printJS：" link="https://github.com/crabbly/Print.js" class="mt-10px" />
      </template>
    </NCard>
  </div>
</template>

<style scoped></style>
