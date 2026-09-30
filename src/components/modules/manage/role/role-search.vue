<script setup lang="ts">
import { enableStatusOptions } from '@/constants/business'
import { $t } from '@/locales'
import { translateOptions } from '@/utils/common'
import { NButton, NCard, NCollapse, NCollapseItem, NForm, NFormItemGi, NGrid, NInput, NSelect, NSpace } from 'naive-ui'
import IconIcRoundRefresh from '~icons/ic/round-refresh'
import IconIcRoundSearch from '~icons/ic/round-search'

defineOptions({
  name: 'RoleSearch',
})

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'reset'): void
  (e: 'search'): void
}

const model = defineModel<Api.SystemManage.RoleSearchParams>('model', { required: true })

function reset() {
  emit('reset')
}

function search() {
  emit('search')
}
</script>

<template>
  <NCard :bordered="false" size="small" class="rounded-lg shadow-xs">
    <NCollapse :default-expanded-names="['role-search']">
      <NCollapseItem :title="$t('common.search')" name="role-search">
        <NForm :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.role.roleName')" path="roleName" class="pr-6">
              <NInput v-model:value="model.roleName" :placeholder="$t('page.manage.role.form.roleName')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.role.roleCode')" path="roleCode" class="pr-6">
              <NInput v-model:value="model.roleCode" :placeholder="$t('page.manage.role.form.roleCode')" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.role.roleStatus')" path="status" class="pr-6">
              <NSelect
                v-model:value="model.status"
                :placeholder="$t('page.manage.role.form.roleStatus')"
                :options="translateOptions(enableStatusOptions)"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
