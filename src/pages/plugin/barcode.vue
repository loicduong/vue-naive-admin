<script setup lang="ts">
import type { Options } from 'jsbarcode'
import JsBarcode from 'jsbarcode'

definePage({
  meta: {
    icon: 'ic:round-barcode',
  },
})

const text = 'Loic Duong'

interface CodeConfig {
  id: string
  title: string
  text: string
  options: Options
}

const codes: CodeConfig[] = [
  {
    id: 'code39',
    title: 'CODE 39 normal size',
    text: 'Hello',
    options: { format: 'code39' },
  },
  {
    id: 'code128',
    title: 'CODE 128 normal size',
    text,
    options: {},
  },
  {
    id: 'ean-13',
    title: 'ENA-13 product barcode',
    text: '1234567890128',
    options: { format: 'ean13' },
  },
  {
    id: 'upc-a',
    title: 'UPC-A product barcode',
    text: '123456789012',
    options: { format: 'upc' },
  },
  {
    id: 'barcode',
    title: 'Different heights, different colors',
    text: 'Hello',
    options: {
      height: 30,
      lineColor: '#9ca3af',
    },
  },
  {
    id: 'barcode1',
    title: 'Add a background color',
    text,
    options: {
      background: '#9ca3af',
      lineColor: '#ffffff',
    },
  },
  {
    id: 'barcode2',
    title: 'The font is very large',
    text,
    options: {
      fontSize: 40,
    },
  },
  {
    id: 'barcode3',
    title: 'The barcode is rough, the text is far away',
    text: 'Hi',
    options: {
      textMargin: 30,
      width: 4,
    },
  },
  {
    id: 'barcode4',
    title: 'The font is on top, still bold',
    text,
    options: {
      textPosition: 'top',
      fontOptions: 'bold',
    },
  },
]

function generateBarcode() {
  codes.forEach((code) => {
    JsBarcode(`#${code.id}`, code.text, code.options)
  })
}

onMounted(() => {
  generateBarcode()
})
</script>

<template>
  <div class="overflow-hidden">
    <NCard
      title="Barcode"
      :bordered="false"
      class="h-full card-wrapper"
      content-class="overflow-hidden"
    >
      <NScrollbar class="h-full">
        <NGrid cols="1 s:2 l:3" :x-gap="12" :y-gap="24" responsive="screen" item-responsive>
          <NGi v-for="item in codes" :key="item.id">
            <div class="flex-col-center">
              <h3>{{ item.title }}</h3>
              <svg :id="item.id" class="h-130px" />
            </div>
          </NGi>
        </NGrid>
      </NScrollbar>
    </NCard>
  </div>
</template>

<style scoped></style>
