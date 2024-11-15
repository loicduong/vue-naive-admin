<script lang="ts" setup>
import type { Options } from 'typeit'
import type { El } from 'typeit/dist/types'
import TypeIt from 'typeit'

definePage({
  meta: {
    icon: 'mdi:typewriter',
  },
})

const textRef = shallowRef<El>()

function init() {
  if (!textRef.value)
    return

  const options: Options = {
    strings: 'VueNaiveAdmin is a fresh, elegant, visually appealing, and powerful backend management template.',
    lifeLike: true,
    speed: 120,
    loop: true,
  }

  const initTypeIt = new TypeIt(textRef.value, options)

  initTypeIt.go()
}

onMounted(() => {
  init()
})
</script>

<template>
  <div>
    <NCard title="Typewriter Plugin" :bordered="false" class="h-full card-wrapper">
      <NSpace :vertical="true">
        <GithubLink link="https://github.com/alexmacarthur/typeit" />
        <WebSiteLink label="Document address: " link="https://www.typeitjs.com/docs/vanilla/usage/" />
      </NSpace>
      <NDivider title-placement="left">
        Basic Example
      </NDivider>
      <span ref="textRef" class="text-18px" />
    </NCard>
  </div>
</template>

<style scoped></style>
