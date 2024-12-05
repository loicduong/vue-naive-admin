<script setup lang="ts">
import * as MapxusMap from '@mapxus/mapxus-map'
import maplibregl from 'maplibre-gl'

definePage({ meta: { icon: 'mdi:map-marker' } })

const mapRef = useTemplateRef('map')

onMounted(() => {
  const maplibreMap = new maplibregl.Map({
    container: mapRef.value as HTMLElement,
    zoom: 18,
  })

  // eslint-disable-next-line no-new
  new MapxusMap.Map({
    map: maplibreMap,
    appId: 'com.mapxus.sample.web',
    secret: 'EnZ/3WkawM',
    buildingId: 'tsuenwanplaza_hk_369d01',
  })
})
</script>

<template>
  <div class="overflow-hidden">
    <NCard
      title="Mapxus Map"
      :bordered="false"
      size="small"
      content-class="overflow-y-hidden overflow-x-auto"
      class="h-full card-wrapper"
    >
      <GithubLink
        link="https://map-service.mapxus.com/dpw/digitalMapWeb"
        label="Documentation"
        class="mb-4"
      />
      <div ref="map" class="h-full w-full" />
    </ncard>
  </div>
</template>

<style></style>
