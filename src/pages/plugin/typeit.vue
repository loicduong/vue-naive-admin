<script lang="ts" setup>
import type { Options } from 'typeit'
import type { El } from 'typeit/dist/types'
import TypeIt from 'typeit'
import { onMounted, shallowRef } from 'vue'
import { NCard, NDivider, NSpace } from 'naive-ui'
import GithubLink from '@/components/custom/github-link.vue'
import WebSiteLink from '@/components/custom/web-site-link.vue'

definePage({
  meta: {
    icon: 'mdi:typewriter',
  },
})

const textRef = shallowRef<El>()

function init() {
  if (!textRef.value) return

  const options: Options = {
    strings: 'NaiveAgenticAdmin is a fresh, elegant, visually appealing, and powerful backend management template.',
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
    <NCard title="Typewriter Plugin" :bordered="false" class="h-full rounded-lg shadow-xs">
      <NSpace :vertical="true">
        <GithubLink link="https://github.com/alexmacarthur/typeit" />
        <WebSiteLink label="Document address: " link="https://www.typeitjs.com/docs/vanilla/usage/" />
      </NSpace>
      <NDivider title-placement="left"> Basic Example </NDivider>
      <span ref="textRef" class="text-[18px]" />
    </NCard>
  </div>
</template>

<style scoped></style>
