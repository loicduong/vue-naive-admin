<script setup lang="ts">
import pagedCss from '@/assets/scss/paged.scss?inline'
import PdfHtmlRoot from '@/components/modules/plugin/pdf/html/pdf-html-root.vue'
import { useLoading } from '@sa/hooks'
import { toPng } from 'html-to-image'
import { Previewer } from 'pagedjs'

definePage({
  meta: {
    icon: 'ph:file-html',
  },
})

const a = useTemplateRef('root')
const preview = useTemplateRef('preview')

const { loading, endLoading } = useLoading(true)
const {
  loading: btnLoading,
  endLoading: btnEndLoading,
  startLoading: btnStartLoading,
} = useLoading()

onMounted(async () => {
  const paged = new Previewer()

  await paged.preview(a.value?.$el?.innerHTML, [{ content: pagedCss }], preview.value)

  endLoading()
})

function downloadPdf(pdfBlob: Blob) {
  const blobUrl = URL.createObjectURL(pdfBlob)
  const link = document.createElement('a')
  link.href = blobUrl
  link.download = 'invoice.pdf'
  link.click()

  URL.revokeObjectURL(blobUrl)
}

async function handleDownload() {
  btnStartLoading()

  const sheets = Array.from(preview.value?.querySelectorAll('.pagedjs_sheet') || [])
  const worker = new Worker(new URL('@/workers/print-html.ts', import.meta.url), { type: 'module' })

  try {
    const images = await Promise.all(
      sheets.map(sheet => toPng(sheet as HTMLElement, {
        fontEmbedCSS: `
          @font-face {
            font-family: 'Gilroy';
            src: url('/fonts/Gilroy.woff2') format('woff2');
          }
        `,
        pixelRatio: 2.5,
        style: { backgroundColor: '#fff' },
      })),
    )

    const pdfPromise = new Promise<Blob>((resolve) => {
      worker.onmessage = event => resolve(event.data)
    })

    worker.postMessage(images)

    const pdfBlob = await pdfPromise

    downloadPdf(pdfBlob)
  }
  catch (error) {
    console.error(error)
  }
  finally {
    worker.terminate()
    btnEndLoading()
  }
}
</script>

<template>
  <div class="overflow-hidden">
    <NCard
      title="PDF HTML Preview"
      :bordered="false"
      class="h-full card-wrapper"
      content-class="overflow-hidden"
    >
      <div class="h-full flex-col-stretch">
        <GithubLink link="https://github.com/pagedjs/pagedjs" />
        <div class="flex-y-center justify-end gap-12px">
          <ButtonIcon tooltip-content="Download" :loading="btnLoading" @click="handleDownload">
            <icon-charm:download />
          </ButtonIcon>
        </div>
        <NScrollbar class="flex-1-hidden">
          <NSkeleton v-if="loading" size="small" class="mt-12px" text :repeat="12" />

          <PdfHtmlRoot ref="root" class="hidden" />

          <main
            ref="preview"
            class="bg-layout py-5"
            :class="{ 'h-0 overflow-hidden': loading }"
          />
        </NScrollbar>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
:deep(.pagedjs_page) {
  margin: 0 auto;
  background-color: #fff;
}

:deep(.pagedjs_page:not(:last-child)) {
  margin-bottom: 20px;
}

:deep(.pagedjs_page .pagedjs_margin-bottom-center) {
  display: flex;
  align-items: flex-end;
}

:deep(.pagedjs_page .pagedjs_margin-top-center) {
  display: flex;
  align-items: flex-start;
}
</style>
