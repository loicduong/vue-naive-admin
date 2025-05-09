<script setup lang="ts">
import {
  resetCacheStrategyOptions,
  themePageAnimationModeOptions,
  themeScrollModeOptions,
} from '@/constants/app'
import { $t } from '@/locales'
import { useThemeStore } from '@/store/modules/theme'
import { translateOptions } from '@/utils/common'
import SettingItem from '../components/setting-item.vue'

defineOptions({ name: 'PageFun' })

const themeStore = useThemeStore()

const layoutMode = computed(() => themeStore.layout.mode)

const isMixLayoutMode = computed(() => layoutMode.value.includes('mix'))

const isWrapperScrollMode = computed(() => themeStore.layout.scrollMode === 'wrapper')
</script>

<template>
  <NDivider>{{ $t('theme.pageFunTitle') }}</NDivider>
  <TransitionGroup tag="div" name="setting-list" class="flex-col-stretch gap-12px">
    <SettingItem key="0" :label="$t('theme.resetCacheStrategy.title')">
      <NSelect
        v-model:value="themeStore.resetCacheStrategy"
        :options="translateOptions(resetCacheStrategyOptions)"
        size="small"
        class="w-120px"
      />
    </SettingItem>
    <SettingItem key="1" :label="$t('theme.scrollMode.title')">
      <NSelect
        v-model:value="themeStore.layout.scrollMode"
        :options="translateOptions(themeScrollModeOptions)"
        size="small"
        class="w-120px"
      />
    </SettingItem>
    <SettingItem key="1-1" :label="$t('theme.page.animate')">
      <NSwitch v-model:value="themeStore.page.animate" />
    </SettingItem>
    <SettingItem v-if="themeStore.page.animate" key="1-2" :label="$t('theme.page.mode.title')">
      <NSelect
        v-model:value="themeStore.page.animateMode"
        :options="translateOptions(themePageAnimationModeOptions)"
        size="small"
        class="w-120px"
      />
    </SettingItem>
    <SettingItem v-if="isWrapperScrollMode" key="2" :label="$t('theme.fixedHeader')">
      <NSwitch v-model:value="themeStore.fixedHeader" />
    </SettingItem>
    <SettingItem key="3" :label="$t('theme.header.height')">
      <NInputNumber
        v-model:value="themeStore.header.height"
        size="small"
        :step="1"
        class="w-120px"
      />
    </SettingItem>
    <SettingItem key="4" :label="$t('theme.header.breadcrumb.visible')">
      <NSwitch v-model:value="themeStore.header.breadcrumb.visible" />
    </SettingItem>
    <SettingItem
      v-if="themeStore.header.breadcrumb.visible"
      key="4-1"
      :label="$t('theme.header.breadcrumb.showIcon')"
    >
      <NSwitch v-model:value="themeStore.header.breadcrumb.showIcon" />
    </SettingItem>
    <SettingItem v-if="layoutMode === 'vertical'" key="6-1" :label="$t('theme.sider.width')">
      <NInputNumber
        v-model:value="themeStore.sider.width"
        size="small"
        :step="1"
        class="w-120px"
      />
    </SettingItem>
    <SettingItem
      v-if="layoutMode === 'vertical'"
      key="6-2"
      :label="$t('theme.sider.collapsedWidth')"
    >
      <NInputNumber
        v-model:value="themeStore.sider.collapsedWidth"
        size="small"
        :step="1"
        class="w-120px"
      />
    </SettingItem>
    <SettingItem v-if="isMixLayoutMode" key="6-3" :label="$t('theme.sider.mixWidth')">
      <NInputNumber
        v-model:value="themeStore.sider.mixWidth"
        size="small"
        :step="1"
        class="w-120px"
      />
    </SettingItem>
    <SettingItem v-if="isMixLayoutMode" key="6-4" :label="$t('theme.sider.mixCollapsedWidth')">
      <NInputNumber
        v-model:value="themeStore.sider.mixCollapsedWidth"
        size="small"
        :step="1"
        class="w-120px"
      />
    </SettingItem>
    <SettingItem
      v-if="layoutMode === 'vertical-mix'"
      key="6-5"
      :label="$t('theme.sider.mixChildMenuWidth')"
    >
      <NInputNumber
        v-model:value="themeStore.sider.mixChildMenuWidth"
        size="small"
        :step="1"
        class="w-120px"
      />
    </SettingItem>
    <SettingItem key="7" :label="$t('theme.footer.visible')">
      <NSwitch v-model:value="themeStore.footer.visible" />
    </SettingItem>
    <SettingItem
      v-if="themeStore.footer.visible && isWrapperScrollMode"
      key="7-1"
      :label="$t('theme.footer.fixed')"
    >
      <NSwitch v-model:value="themeStore.footer.fixed" />
    </SettingItem>
    <SettingItem v-if="themeStore.footer.visible" key="7-2" :label="$t('theme.footer.height')">
      <NInputNumber
        v-model:value="themeStore.footer.height"
        size="small"
        :step="1"
        class="w-120px"
      />
    </SettingItem>
    <SettingItem key="9" :label="$t('theme.header.multilingual.visible')">
      <NSwitch v-model:value="themeStore.header.multilingual.visible" />
    </SettingItem>
  </TransitionGroup>
</template>

<style scoped>
.setting-list-move,
.setting-list-enter-active,
.setting-list-leave-active {
  --uno: transition-all-300;
}

.setting-list-enter-from,
.setting-list-leave-to {
  --uno: opacity-0 -translate-x-30px;
}

.setting-list-leave-active {
  --uno: absolute;
}
</style>
