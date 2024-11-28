<script setup lang="ts">
import type { LogicFlow } from '@logicflow/core'

interface Props { lf?: LogicFlow | null }

const props = withDefaults(defineProps<Props>(), {
  lf: null,
})

const emit = defineEmits<{ (e: 'catData'): void }>()

const controlButton3 = ref()
const controlButton4 = ref()

const focusIndex = ref<number>(-1)
const titleLists = ref([
  {
    icon: 'carbon-zoom-out',
    text: 'Zoom Out',
    size: '18',
    disabled: false,
  },
  {
    icon: 'carbon-zoom-in',
    text: 'Zoom In',
    size: '18',
    disabled: false,
  },
  {
    icon: 'carbon-maximize',
    text: 'Fit',
    size: '15',
    disabled: false,
  },
  {
    icon: 'carbon-undo',
    text: 'Previous',
    size: '15',
    disabled: true,
  },
  {
    icon: 'carbon-redo',
    text: 'Next',
    size: '17',
    disabled: true,
  },
  {
    icon: 'carbon-download',
    text: 'Download Image',
    size: '17',
    disabled: false,
  },
  {
    icon: 'carbon-view',
    text: 'View Data',
    size: '17',
    disabled: false,
  },
])

function onControl(key: number) {
  ['zoom', 'zoom', 'resetZoom', 'undo', 'redo', 'getSnapshot'].forEach(
    (v, i) => {
      const domControl = props.lf
      if (key === 1) {
        domControl?.zoom(true)
      }
      if (key === 6) {
        emit('catData')
      }
      if (key === i) {
        domControl?.[v]()
      }
    },
  )
}

function onEnter(key: number) {
  focusIndex.value = key
}

onMounted(() => {
  props.lf?.on('history:change', ({ data: { undoAble, redoAble } }) => {
    unref(titleLists)[3].disabled = unref(controlButton3).disabled = !undoAble
    unref(titleLists)[4].disabled = unref(controlButton4).disabled = !redoAble
  })
})
</script>

<template>
  <div class="control-container">
    <!-- Function buttons -->
    <ul>
      <li
        v-for="(item, key) in titleLists"
        :key="key"
        :title="item.text"
        class="dark:text-bg_color"
        @mouseenter.prevent="onEnter(key)"
        @mouseleave.prevent="focusIndex = -1"
      >
        <button
          :ref="`controlButton${key}`"
          v-tippy="{
            content: item.text,
          }"
          :disabled="item.disabled"
          :class="`bg-transparent ${!item.disabled ? 'cursor-pointer text-inherit' : 'cursor-not-allowed text-[#00000040]'}`"
          @click="onControl(key)"
        >
          <SvgIcon :icon="item.icon" :style="{ fontSize: `${item.size}px` }" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.control-container {
  background: hsl(0deg 0% 100% / 80%);
  box-shadow: 0 1px 4px rgb(0 0 0 / 20%);
}

.control-container ul li {
  margin: 10px;
  text-align: center;
}

.control-container ul li span:hover {
  color: var(--primary-color);
}
</style>
