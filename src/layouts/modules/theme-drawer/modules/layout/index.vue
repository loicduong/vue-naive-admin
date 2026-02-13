<script setup lang="ts">
import ContentSettings from './modules/content-settings.vue'
import FooterSettings from './modules/footer-settings.vue'
import HeaderSettings from './modules/header-settings.vue'
import LayoutMode from './modules/layout-mode.vue'
import SiderSettings from './modules/sider-settings.vue'

defineOptions({
  name: 'LayoutSettings',
})
</script>

<template>
  <div class="flex-col-stretch gap-16px">
    <LayoutMode />
    <HeaderSettings />
    <SiderSettings />
    <FooterSettings />
    <ContentSettings />
  </div>
</template>

<style scoped></style>
