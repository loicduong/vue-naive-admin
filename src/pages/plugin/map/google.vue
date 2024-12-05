<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'

definePage({ meta: { icon: 'simple-icons:googlemaps' } })

const center = { lat: 10.779736, lng: 106.6990376 }
</script>

<template>
  <div class="overflow-hidden">
    <NCard
      title="Google Map"
      :bordered="false"
      size="small"
      content-class="overflow-y-hidden overflow-x-auto"
      class="h-full card-wrapper"
    >
      <GithubLink link="https://github.com/inocan-group/vue3-google-map" class="mb-4" />
      <GoogleMap class="h-full w-full" :center="center" :zoom="15">
        <Marker :options="{ position: center }" />
      </Googlemap>
    </ncard>
  </div>
</template>

<style></style>
