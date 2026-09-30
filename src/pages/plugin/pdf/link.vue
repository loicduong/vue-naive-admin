<script setup lang="ts">
import useLoading from '@/hooks/common/use-loading'
import VuePdfEmbed from 'vue-pdf-embed'
import { ref, shallowRef } from 'vue'
import { NCard, NCheckbox, NPagination, NScrollbar, NSkeleton } from 'naive-ui'
import GithubLink from '@/components/custom/github-link.vue'
import WebSiteLink from '@/components/custom/web-site-link.vue'
import ButtonIcon from '@/components/custom/button-icon.vue'
import IconMaterialSymbolsLightRotate90DegreesCcwOutlineRounded from '~icons/material-symbols-light/rotate90-degrees-ccw-outline-rounded'
import IconMdiPrinter from '~icons/mdi/printer'
import IconCharmDownload from '~icons/charm/download'

definePage({
  meta: {
    icon: 'mdi:file-link-outline',
  },
})

const { loading, endLoading } = useLoading(true)

const pdfRef = shallowRef<InstanceType<typeof VuePdfEmbed> | null>(null)
const source = `https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf`

const showAllPages = ref(false)
const currentPage = ref<undefined | number>(1)
const pageCount = ref(1)

function onPdfRendered() {
  endLoading()

  if (pdfRef.value?.doc) {
    pageCount.value = pdfRef.value.doc.numPages
  }
}

function showAllPagesChange() {
  currentPage.value = showAllPages.value ? undefined : 1
}

const rotations = [0, 90, 180, 270]
const currentRotation = ref(0)

function handleRotate() {
  currentRotation.value = (currentRotation.value + 1) % 4
}

async function handlePrint() {
  await pdfRef.value?.print(undefined, 'test.pdf', true)
}

async function handleDownload() {
  await pdfRef.value?.download('test.pdf')
}
</script>

<template>
  <div class="overflow-hidden">
    <NCard title="PDF Link Preview" :bordered="false" class="h-full card-wrapper" content-class="overflow-hidden">
      <div class="h-full flex-col-stretch">
        <GithubLink link="https://github.com/hrynko/vue-pdf-embed" />
        <WebSiteLink label="Document address: " link="https://www.npmjs.com/package/vue-pdf-embed" />
        <div class="flex-y-center justify-end gap-3">
          <NCheckbox v-model:checked="showAllPages" @update:checked="showAllPagesChange"> Show all pages </NCheckbox>
          <ButtonIcon tooltip-content="Rotate 90 degrees" @click="handleRotate">
            <icon-material-symbols-light-rotate-90-degrees-ccw-outline-rounded />
          </ButtonIcon>
          <ButtonIcon tooltip-content="Print" @click="handlePrint">
            <icon-mdi-printer />
          </ButtonIcon>
          <ButtonIcon tooltip-content="Download" @click="handleDownload">
            <icon-charm-download />
          </ButtonIcon>
        </div>
        <NScrollbar class="flex-1-hidden">
          <NSkeleton v-if="loading" size="small" class="mt-3" text :repeat="12" />
          <VuePdfEmbed
            ref="pdfRef"
            class="container overflow-auto"
            :class="{ 'h-0': loading }"
            :rotation="rotations[currentRotation]"
            :page="currentPage"
            :source="source"
            @rendered="onPdfRendered"
          />
        </NScrollbar>
        <div class="flex-y-center justify-between">
          <div v-if="showAllPages" class="text-[18px] font-medium">Total {{ pageCount }} pages</div>
          <NPagination v-else v-model:page="currentPage" :page-count="pageCount" :page-size="1" />
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped></style>
