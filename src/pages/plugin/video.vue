<script setup lang="ts">
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'

definePage({
  meta: {
    icon: 'mdi:video',
  },
})

const domRef = ref<HTMLElement>()
const player = ref<Player>()

function renderXgPlayer() {
  if (!domRef.value)
    return
  const url = 'https://file-examples.com/storage/fec85039006734629a992d7/2017/04/file_example_MP4_480_1_5MG.mp4'
  player.value = new Player({
    el: domRef.value,
    url,
    playbackRate: [0.5, 0.75, 1, 1.5, 2],
  })
}
function destroyXgPlayer() {
  player.value?.destroy()
}

onMounted(() => {
  renderXgPlayer()
})

onUnmounted(() => {
  destroyXgPlayer()
})
</script>

<template>
  <div>
    <NCard title="Video player plugin" :bordered="false" class="h-full card-wrapper">
      <div class="flex-center">
        <div ref="domRef" class="h-auto w-full shadow-md" />
      </div>
    </NCard>
  </div>
</template>

<style scoped></style>
