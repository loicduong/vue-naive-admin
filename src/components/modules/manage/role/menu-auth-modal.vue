<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import { $t } from '@/locales'
import { fetchGetAllPages, fetchGetMenuTree } from '@/service/api'
import { NButton, NModal, NSelect, NSpace, NTree } from 'naive-ui'

defineOptions({
  name: 'MenuAuthModal',
})

const props = defineProps<Props>()

interface Props {
  /** the roleId */
  roleId: number
}

const visible = defineModel<boolean>('visible', {
  default: false,
})

function closeModal() {
  visible.value = false
}

const title = computed(() => $t('common.edit') + $t('page.manage.role.menuAuth'))

const home = shallowRef('')

async function getHome() {
  // oxlint-disable-next-line no-console
  console.log(props.roleId)

  home.value = 'home'
}

async function updateHome(val: string) {
  // request

  home.value = val
}

const pages = shallowRef<string[]>([])

async function getPages() {
  const { error, data } = await fetchGetAllPages()

  if (!error) {
    pages.value = data
  }
}

const pageSelectOptions = computed(() => {
  const opts: CommonType.Option[] = pages.value.map(page => ({
    label: page,
    value: page,
  }))

  return opts
})

const tree = shallowRef<Api.SystemManage.MenuTree[]>([])

async function getTree() {
  const { error, data } = await fetchGetMenuTree()

  if (!error) {
    tree.value = data
  }
}

const checks = shallowRef<number[]>([])

async function getChecks() {
  // oxlint-disable-next-line no-console
  console.log(props.roleId)
  // request
  checks.value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
}

function handleSubmit() {
  // oxlint-disable-next-line no-console
  console.log(checks.value, props.roleId)
  // request

  window.$message?.success?.($t('common.modifySuccess'))

  closeModal()
}

function init() {
  getHome()
  getPages()
  getTree()
  getChecks()
}

watch(visible, val => {
  if (val) {
    init()
  }
})
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-120">
    <div class="flex-y-center gap-4 pb-3">
      <div>{{ $t('page.manage.menu.home') }}</div>
      <NSelect :value="home" :options="pageSelectOptions" size="small" class="w-40" @update:value="updateHome" />
    </div>
    <NTree
      v-model:checked-keys="checks"
      :data="tree"
      key-field="id"
      checkable
      expand-on-click
      virtual-scroll
      block-line
      class="h-70"
    />
    <template #footer>
      <NSpace justify="end">
        <NButton size="small" class="mt-4" @click="closeModal">
          {{ $t('common.cancel') }}
        </NButton>
        <NButton type="primary" size="small" class="mt-4" @click="handleSubmit">
          {{ $t('common.confirm') }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
