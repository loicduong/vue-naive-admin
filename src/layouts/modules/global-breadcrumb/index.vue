<script setup lang="ts">
import { useRouterPush } from '@/hooks/common/router'
import { useRouteStore } from '@/store/modules/route'
import { useThemeStore } from '@/store/modules/theme'

defineOptions({ name: 'GlobalBreadcrumb' })

const themeStore = useThemeStore()
const routeStore = useRouteStore()
const { routerPushByKey } = useRouterPush()

interface BreadcrumbContentProps { breadcrumb: App.Global.Menu }

const [
  DefineBreadcrumbContent,
  BreadcrumbContent,
] = createReusableTemplate<BreadcrumbContentProps>()

const handleClickMenu = (key: App.Global.RouteKey) => (routerPushByKey(key))
</script>

<template>
  <NBreadcrumb v-if="themeStore.header.breadcrumb.visible">
    <DefineBreadcrumbContent v-slot="{ breadcrumb }">
      <div class="i-flex-y-center align-middle">
        <component
          :is="breadcrumb.icon"
          v-if="themeStore.header.breadcrumb.showIcon"
          class="mr-4px text-icon"
        />
        <template v-if="typeof breadcrumb.label === 'string'">
          {{ breadcrumb.label }}
        </template>
        <component :is="breadcrumb.label()" v-else />
      </div>
    </DefineBreadcrumbContent>

    <NBreadcrumbItem v-for="item in routeStore.breadcrumbs" :key="item.key">
      <NDropdown v-if="item.options?.length" :options="item.options" @select="handleClickMenu">
        <BreadcrumbContent :breadcrumb="item" />
      </NDropdown>
      <BreadcrumbContent v-else :breadcrumb="item" />
    </NBreadcrumbItem>
  </NBreadcrumb>
</template>

<style scoped></style>
