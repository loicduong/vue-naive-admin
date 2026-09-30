<script setup lang="ts">
import { icons } from '@/components/modules/plugin/icon/icons'
import { ref } from 'vue'
import { NCard } from 'naive-ui'
import SvgIcon from '@/components/custom/svg-icon.vue'
import CustomIconSelect from '@/components/custom/custom-icon-select.vue'
import WebSiteLink from '@/components/custom/web-site-link.vue'
import IconLocalActivity from '~icons/local/activity'
import IconLocalCast from '~icons/local/cast'

definePage({
  meta: {
    localIcon: 'custom-icon',
  },
})

const selectValue = ref('')

const localIcons = ['custom-icon', 'activity', 'at-sign', 'cast', 'chrome', 'copy', 'wind']
</script>

<template>
  <div class="h-full">
    <NCard title="Icon component example" :bordered="false" class="rounded-lg shadow-xs">
      <div class="grid grid-cols-10">
        <template v-for="item in icons" :key="item">
          <div class="mt-[5px] flex justify-center">
            <SvgIcon :icon="item" class="text-[30px]" />
          </div>
        </template>
      </div>
      <div class="mt-[50px]">
        <h1 class="mb-5 text-[18px] font-medium">Icon icon selector</h1>
        <CustomIconSelect v-model:value="selectValue" :icons="icons" />
      </div>
      <template #footer>
        <WebSiteLink label="Iconify address:" link="https://icones.js.org/" class="mt-2.5" />
      </template>
    </NCard>
    <NCard title="Custom icon example" :bordered="false" class="mt-2.5 rounded-lg shadow-xs">
      <div class="pb-3 text-[16px]">
        The SVG files in the src/assets/svg-icon folder can be directly rendered in the template using
        icon-local-{filename}, where icon-local is the VITE_ICON_LOCAL_PREFIX in the .env file.
      </div>
      <div class="grid grid-cols-10">
        <div class="mt-[5px] flex justify-center">
          <icon-local-activity class="text-[40px] text-success" />
        </div>
        <div class="mt-[5px] flex justify-center">
          <icon-local-cast class="text-[20px] text-error" />
        </div>
      </div>
      <div class="py-3 text-[16px]">
        Dynamically render through the SvgIcon component, the menu renders custom icons through the localIcon property
        of meta.
      </div>
      <div class="grid grid-cols-10">
        <div v-for="(fileName, index) in localIcons" :key="index" class="mt-[5px] flex justify-center">
          <SvgIcon :local-icon="fileName" class="text-[30px] text-primary" />
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped></style>
