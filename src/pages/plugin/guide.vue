<script setup lang="ts">
import intro from 'intro.js'
import 'intro.js/minified/introjs.min.css'

interface IntroStep {
  element?: HTMLElement | string
  title?: string
  intro?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  tooltipClass?: string
  highlightClass?: string
  scrollTo?: 'off' | 'tooltip' | 'element'
}

definePage({
  meta: {
    icon: 'material-symbols:lightbulb',
  },
})

const guildSteps = computed<Partial<IntroStep>[]>(() => [
  {
    element: document.querySelector('#global-logo') as HTMLElement,
    title: 'Project Name and Logo',
    intro: 'You can set the project name and logo here',
    position: 'left',
  },
  {
    element: document.querySelector('#global-search') as HTMLElement,
    title: 'Search Menu',
    intro: 'You can search for menus you want to view here',
    position: 'left',
  },
  {
    element: document.querySelector('#global-full-screen') as HTMLElement,
    title: 'Full Screen',
    intro: 'You can toggle full screen mode here',
    position: 'left',
  },
  {
    element: document.querySelector('#global-lang-switch') as HTMLElement,
    title: 'Internationalization',
    intro: 'You can switch languages here',
    position: 'left',
  },
  {
    element: document.querySelector('#global-theme-schema-switch') as HTMLElement,
    title: 'Theme Mode',
    intro: 'You can switch theme mode here',
    position: 'left',
  },
  {
    element: document.querySelector('#global-theme-switch') as HTMLElement,
    title: 'System Configuration',
    intro: 'You can view system configuration here',
    position: 'left',
  },
  {
    element: document.querySelector('#global-tab') as HTMLElement,
    title: 'Multi-tab View',
    intro: 'This shows the history of pages you have visited',
    position: 'bottom',
  },
])

function onGuide() {
  intro()
    .setOptions({
      steps: guildSteps.value,
    })
    .start()
}
</script>

<template>
  <div class="overflow-hidden">
    <NCard
      title="Guide"
      :bordered="false"
      size="small"
      content-class="overflow-y-hidden overflow-x-auto"
      class="h-full card-wrapper"
    >
      <GithubLink link="https://github.com/usablica/intro.js" class="mb-4" />
      <NButton @click="onGuide">
        Open Guide
      </NButton>
    </NCard>
  </div>
</template>

<style>
.introjs-tooltip-title,
.introjs-tooltiptext {
  color: rgb(var(--primary-color));
}
</style>
