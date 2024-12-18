<script setup lang="ts">
import CardData from '@/components/modules/home/card-data.vue'
import CreativityBanner from '@/components/modules/home/creativity-banner.vue'
import HeaderBanner from '@/components/modules/home/header-banner.vue'
import LineChart from '@/components/modules/home/line-chart.vue'
import PieChart from '@/components/modules/home/pie-chart.vue'
import ProjectNews from '@/components/modules/home/project-news.vue'
import { useAppStore } from '@/store/modules/app'

definePage({
  meta: {
    icon: 'mdi:monitor-dashboard',
    order: 1,
  },
})

const appStore = useAppStore()

const gap = computed(() => (appStore.isMobile ? 0 : 16))
</script>

<template>
  <NSpace vertical :size="16">
    <HeaderBanner />
    <CardData />
    <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <NGi span="24 s:24 m:14">
        <NCard :bordered="false" class="card-wrapper">
          <LineChart />
        </NCard>
      </NGi>
      <NGi span="24 s:24 m:10">
        <NCard :bordered="false" class="card-wrapper">
          <PieChart />
        </NCard>
      </NGi>
    </NGrid>
    <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <NGi span="24 s:24 m:14">
        <ProjectNews />
      </NGi>
      <NGi span="24 s:24 m:10">
        <CreativityBanner />
      </NGi>
    </NGrid>
  </NSpace>
</template>

<style scoped></style>
