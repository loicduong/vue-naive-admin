<script setup lang="ts">
import pagedCss from '@/assets/scss/paged.scss?inline'
import PdfHtmlRoot from '@/components/modules/plugin/pdf/html/pdf-html-root.vue'
import { toPng } from 'html-to-image'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Previewer } from 'pagedjs'

definePage({
  meta: {
    icon: 'ph:file-html',
  },
})

const a = useTemplateRef('paged')
const preview = useTemplateRef('preview')

onMounted(async () => {
  const paged = new Previewer()

  await paged.preview(a.value?.$el?.innerHTML, [{ content: pagedCss }], preview.value)
})

const canvasPreview = ref(null)

async function handleExportPDF() {
  const element = document.querySelector('.preview')
  if (!element)
    return

  await document.fonts.ready
  const images = Array.from(element?.getElementsByTagName('img'))
  await Promise.all(images.map((img) => {
    if (img.complete)
      return Promise.resolve()
    return new Promise((resolve) => {
      img.onload = resolve
      img.onerror = resolve
    })
  }))
  try {
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 3,
      style: {
        margin: '0',
        padding: '0',
        width: '100%',
        transform: 'scale(1)',
      },
      beforeDraw: (clone) => {
        clone.style.width = '100%'
        clone.style.margin = '0'
        clone.style.padding = '0'
        clone.style.transform = 'scale(1)'
        // Xử lý DOM trước khi render
        const pages = clone.querySelectorAll('.pagedjs_page')
        pages.forEach((page) => {
          page.style.margin = '0'
        })

        // Copy styles từ Naive UI
        const originalElements = document.querySelectorAll('.n-data-table, .n-button')
        originalElements.forEach((original) => {
          const computedStyle = window.getComputedStyle(original)
          const validClasses = Array.from(original.classList)
            .filter(cls =>
              cls.startsWith('n-')
              || /^[a-zA-Z0-9_-]+$/.test(cls),
            )
            .map(cls => `.${cls}`)
            .join('')

          if (validClasses) {
            try {
              const cloned = clone.querySelector(validClasses)
              if (cloned) {
                Array.from(computedStyle).forEach((key) => {
                  cloned.style[key] = computedStyle[key]
                })
              }
            }
            catch (error) {
              console.warn('Invalid selector:', validClasses)
            }
          }
        })
      },
    })

    canvasPreview.value = dataUrl

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const img = new Image()
    img.src = dataUrl
    img.style.width = '100%'
    // img.height = 'auto'
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    console.log(pageWidth, pageHeight)

    await new Promise((resolve) => {
      img.onload = () => {
        const imgWidth = pageWidth
        const imgHeight = (img.height * imgWidth) / img.width

        let position = 0
        let heightLeft = imgHeight

        while (heightLeft > 0) {
          if (position > 0) {
            pdf.addPage()
          }

          pdf.addImage(
            dataUrl,
            'JPEG',
            0, // Không margin trái
            0, // Không margin trên
            imgWidth, // Sử dụng toàn bộ chiều rộng
            imgHeight,
          )

          heightLeft -= pageHeight
          position += pageHeight
        }
        resolve(true)
      }
    })

    console.log(img)

    // 5. Lưu file
    pdf.save('invoice.pdf')
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <NCard :bordered="false" class="h-full card-wrapper">
    <button @click="handleExportPDF">
      Xuất PDF
    </button>

    <PdfHtmlRoot ref="paged" class="paged" />

    <main ref="preview" class="preview" />

    <div v-if="canvasPreview" class="canvas-preview">
      <h3>Canvas Preview:</h3>
      <img :src="canvasPreview" alt="Preview" class="canvas-image">
    </div>
  </NCard>
</template>

<style scoped>
.canvas-preview {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  overflow: auto;
}

/* Scale canvas để vừa màn hình */
:deep(canvas) {
  max-width: 100%;
  height: auto;
}

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
