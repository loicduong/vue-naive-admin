<script setup lang="ts">
import pagedCss from '@/assets/scss/paged.scss?inline'
import PdfHtmlRoot from '@/components/modules/plugin/pdf/html/pdf-html-root.vue'
import { useLoading } from '@sa/hooks'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'
import { Previewer } from 'pagedjs'

definePage({
  meta: {
    icon: 'ph:file-html',
  },
})

const a = useTemplateRef('paged')
const preview = useTemplateRef('preview')

const { loading, endLoading } = useLoading(true)

onMounted(async () => {
  const paged = new Previewer()

  await paged.preview(a.value?.$el?.innerHTML, [{ content: pagedCss }], preview.value)

  endLoading()
})

async function handleDownload() {
  loading.value = true

  const sheets = preview.value?.querySelectorAll('.pagedjs_sheet')
  if (!sheets?.length)
    return

  // eslint-disable-next-line new-cap
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i]

    const dataUrl = await toPng(sheet as HTMLElement, {
      quality: 1.0,
      pixelRatio: 3,
      style: {
        backgroundColor: '#fff',
      },
    })

    if (i > 0) {
      pdf.addPage()
    }

    pdf.addImage(
      dataUrl,
      'PNG',
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight(),
      undefined,
      'NONE',
    )
  }

  pdf.save('invoice.pdf')

  endLoading()
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
          <ButtonIcon tooltip-content="Download" @click="handleDownload">
            <icon-charm:download />
          </ButtonIcon>
        </div>
        <NScrollbar class="flex-1-hidden">
          <NSkeleton v-if="loading" size="small" class="mt-12px" text :repeat="12" />
          <PdfHtmlRoot ref="paged" class="paged" />

          <main ref="preview" class="preview" />
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

.paged {
  display: none;
}
</style>
