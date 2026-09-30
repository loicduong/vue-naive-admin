<script lang="ts" setup>
import { useRouterPush } from '@/hooks/common/router'
import { $t } from '@/locales'
import { computed } from 'vue'
import { NButton } from 'naive-ui'
import SvgIcon from '@/components/custom/svg-icon.vue'

defineOptions({ name: 'ExceptionBase' })

const props = defineProps<Props>()

type ExceptionType = '403' | '404' | '500'

interface Props {
  /**
   * Exception type
   *
   * - 403: no permission
   * - 404: not found
   * - 500: service error
   */
  type: ExceptionType
}

const { routerPushByKey } = useRouterPush()

const iconMap: Record<ExceptionType, string> = {
  403: 'no-permission',
  404: 'not-found',
  500: 'service-error',
}

const icon = computed(() => iconMap[props.type])
</script>

<template>
  <div class="size-full min-h-130 flex-col-center gap-6 overflow-hidden">
    <div class="flex text-[400px] text-primary">
      <SvgIcon :local-icon="icon" />
    </div>
    <NButton type="primary" @click="routerPushByKey('/')">
      {{ $t('common.backToHome') }}
    </NButton>
  </div>
</template>

<style scoped></style>
