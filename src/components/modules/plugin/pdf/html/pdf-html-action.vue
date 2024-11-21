<script setup lang="ts">
interface Props {
  total: number
}

defineProps<Props>()

const model = defineModel<number>({ default: 1 })

const currentZoom = ref(1)
const MIN_ZOOM = 0.25
const MAX_ZOOM = 5
const ZOOM_STEP = 0.25

function setZoomFromPoint(scale: number, mouseX: number, mouseY: number) {
  const pages = document.querySelector('.pagedjs_pages')
  if (!pages)
    return

  const newZoom = Math.min(Math.max(scale, MIN_ZOOM), MAX_ZOOM)
  const prevZoom = currentZoom.value

  const mouseXReal = (mouseX + window.scrollX) / prevZoom
  const mouseYReal = (mouseY + window.scrollY) / prevZoom;

  (pages as HTMLElement).style.zoom = newZoom.toString()
  currentZoom.value = newZoom

  const newScrollX = mouseXReal * newZoom - mouseX
  const newScrollY = mouseYReal * newZoom - mouseY

  window.scrollTo(newScrollX, newScrollY)
}

function setZoom(scale: number) {
  const pages = document.querySelector('.pagedjs_pages')

  if (pages) {
    currentZoom.value = Math.min(Math.max(scale, MIN_ZOOM), MAX_ZOOM);
    (pages as HTMLElement).style.zoom = currentZoom.value.toString()
  }
}

function handleZoomOut() {
  setZoom(currentZoom.value - ZOOM_STEP)
}

function handleZoomIn() {
  setZoom(currentZoom.value + ZOOM_STEP)
}

function handleReset() {
  setZoom(1)
}

function handleKeyboard(e: KeyboardEvent) {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case '+':
      case '=':
        e.preventDefault()
        handleZoomIn()
        break
      case '-':
        e.preventDefault()
        handleZoomOut()
        break
      case '0':
        e.preventDefault()
        handleReset()
        break
    }
  }
}

function handleWheel(e: WheelEvent) {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()

    const delta = e.deltaY > 0 ? -1 : 1

    const newZoom = currentZoom.value + delta * ZOOM_STEP

    setZoomFromPoint(newZoom, e.clientX, e.clientY)
  }
}

useEventListener('keydown', handleKeyboard)

useEventListener('wheel', handleWheel, { passive: false })
</script>

<template>
  <div class="absolute bottom-0 left-1/2 z-1 flex justify-center -translate-x-1/2">
    <div
      class="mx-auto h-[40px] inline-flex items-center justify-between rounded-[4px] bg-[#181818] p-[10px] text-white"
    >
      <div>Page {{ model }} / {{ total }}</div>
      <div class="flex justify-center gap-[10px]">
        <div
          class="h-[32px] w-[32px] flex cursor-pointer items-center justify-center"
          @click="handleZoomOut"
        >
          <icon-ic:baseline-minus class="h-[16px] w-[16px]" />
        </div>

        <NTooltip>
          <template #trigger>
            <div
              v-if="currentZoom >= 1"
              class="h-[32px] w-[32px] flex cursor-pointer items-center justify-center"
            >
              <icon-ic:baseline-zoom-in class="h-[16px] w-[16px] text-white" />
            </div>

            <div v-else class="h-[32px] w-[32px] flex cursor-pointer items-center justify-center">
              <icon-ic:baseline-zoom-out class="h-[16px] w-[16px] text-white" />
            </div>
          </template>
          {{ Math.round(currentZoom * 100) }}%
        </NTooltip>

        <div
          class="h-[32px] w-[32px] flex cursor-pointer items-center justify-center"
          @click="handleZoomIn"
        >
          <icon-ic:baseline-plus class="h-[16px] w-[16px] text-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.pagedjs_pages {
  transition: zoom 0.1s ease;
}
</style>
