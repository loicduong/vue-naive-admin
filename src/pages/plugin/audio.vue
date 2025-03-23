<script setup lang="ts">
import { longpress } from '@/directives/longpress'
import WaveSurfer from 'wavesurfer.js'

defineOptions({ directives: { longpress } })

definePage({ meta: { icon: 'material-symbols:sound-sensing' } })

const loading = ref(true)
const wavesurfer = ref<WaveSurfer>()
const wavesurferRef = useTemplateRef<HTMLElement>('wavesurferRef')
// Total audio duration (formatted as mm:ss)
const totalTime = ref()
// Total audio duration (in seconds)
const totalSecondTime = ref()
// Current audio playback position duration
const curTime = ref()
// Whether audio is playing
const isPlay = ref(false)

const url = computed(() => new URL('@/assets/audio/boundless-skies.mp3', import.meta.url).href)

function init() {
  wavesurfer.value = WaveSurfer.create({
    container: wavesurferRef.value!,
    height: 'auto',
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
    cursorColor: 'rgb(64, 158, 255)',
    cursorWidth: 4,
    url: url.value,
  })

  // Triggered after the audio is decoded
  wavesurfer.value.on('decode', () => (loading.value = false))

  // Triggered when the audio is decoded and ready to play
  wavesurfer.value.on('ready', () => {
    if (!wavesurfer.value)
      return
    const decodedData = wavesurfer.value.getDecodedData()
    totalSecondTime.value = decodedData!.duration
    const m = Math.floor(decodedData!.duration / 60)
    const s = Math.floor(decodedData!.duration % 60)
    totalTime.value = `${m}:${s}`
    // Set cursor position to middle
    wavesurfer.value.setTime(decodedData!.duration / 2)
    // Set audio volume (range 0-1)
    // wavesurfer.value.setVolume(1);
  })

  // Triggered when the audio position changes, continuously during playback
  wavesurfer.value.on('timeupdate', (timer) => {
    if (timer > totalSecondTime.value)
      return
    const m = Math.floor(timer / 60)
    const s = Math.floor(timer % 60)
    curTime.value = `${m}:${s}`
  })

  // Triggered when the audio is playing
  wavesurfer.value.on('play', () => (isPlay.value = true))

  // Triggered when the audio is paused
  wavesurfer.value.on('pause', () => (isPlay.value = false))
}

onMounted(init)

onBeforeUnmount(() => {
  if (wavesurfer.value) {
    wavesurfer.value.destroy()
    wavesurfer.value = undefined
  }
})
</script>

<template>
  <div class="overflow-hidden">
    <NCard
      title="Audio Visualization"
      :bordered="false"
      class="h-full card-wrapper"
      content-class="overflow-hidden"
    >
      <div class="h-full flex-col-stretch">
        <GithubLink link="https://github.com/katspaugh/wavesurfer.js" />
        <NScrollbar class="flex-1-hidden">
          <NSpin :show="loading">
            <div class="w-8/12 !m-auto !mt-[20px]">
              <div ref="wavesurferRef" />
              <div v-show="totalTime" class="flex justify-between">
                <span class="text-[#81888f]">00:00</span>
                <h1 class="mt-2 text-4xl">
                  {{ curTime }}
                </h1>
                <span class="text-[#81888f]">{{ totalTime }}</span>
              </div>

              <div v-show="totalTime" class="m-auto mt-2 w-[180px] flex justify-around">
                <NTooltip placement="bottom">
                  <template #trigger>
                    <icon-material-symbols:fast-rewind
                      v-longpress:0:100="() => wavesurfer?.skip(-1)"
                      class="h-8 w-8 cursor-pointer"
                    />
                  </template>
                  Fast rewind (long press available)
                </NTooltip>
                <NTooltip placement="bottom">
                  <template #trigger>
                    <div class="cursor-pointer" @click="wavesurfer?.playPause()">
                      <icon-material-symbols:pause-rounded v-if="isPlay" class="h-10 w-10" />
                      <icon-material-symbols:play-arrow v-else class="h-10 w-10" />
                    </div>
                  </template>
                  {{ isPlay ? 'Pause' : 'Play' }}
                </NTooltip>
                <NTooltip placement="bottom">
                  <template #trigger>
                    <icon-material-symbols:fast-forward
                      v-longpress:0:100="() => wavesurfer?.skip(1)"
                      class="h-8 w-8 cursor-pointer"
                    />
                  </template>
                  Fast forward (long press available)
                </NTooltip>
              </div>
            </div>
          </NSpin>
        </NScrollbar>
      </div>
    </NCard>
  </div>
</template>
