<script setup lang="ts">
import SignaturePad from 'signature_pad'

definePage({ meta: { icon: 'ic:round-draw' } })

const canvas = useTemplateRef('canvas')

const signature = ref<SignaturePad>()

onMounted(() => {
  signature.value = new SignaturePad(canvas.value!, { backgroundColor: '#fff' })

  useEventListener('resize', resizeCanvas)

  resizeCanvas()
})

function resizeCanvas() {
  const ratio = Math.max(window.devicePixelRatio || 1, 1)
  canvas.value!.width = canvas.value!.offsetWidth * ratio
  canvas.value!.height = canvas.value!.offsetHeight * ratio
  canvas.value!.getContext('2d')?.scale(ratio, ratio)
  signature.value?.clear() // otherwise isEmpty() might return incorrect value
}

function handleSave() {
  const data = signature.value?.toDataURL('image/png')

  if (!data) {
    return
  }

  const link = document.createElement('a')
  link.download = 'signature.png'
  link.href = data
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const handleClear = () => (signature.value?.clear())
</script>

<template>
  <div class="overflow-hidden">
    <NCard title="Signature Pad" :bordered="false" class="h-full card-wrapper" content-class="overflow-hidden">
      <div class="h-full flex-col-stretch">
        <GithubLink link="https://github.com/szimek/signature_pad" />
        <div class="flex-y-center justify-end gap-12px">
          <ButtonIcon tooltip-content="Download" @click="handleSave">
            <icon-charm:download />
          </ButtonIcon>
          <ButtonIcon tooltip-content="Clear" @click="handleClear">
            <icon-charm:eraser />
          </ButtonIcon>
        </div>
        <canvas ref="canvas" class="h-full w-full cursor-crosshair" />
      </div>
    </NCard>
  </div>
</template>

<style scoped>
canvas {
  cursor:
    url('@/assets/svg-icon/pencil.svg') 0 24,
    auto;
}
</style>
