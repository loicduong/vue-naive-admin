<script setup lang="ts">
import { $t } from '@/locales'

defineOptions({
  name: 'LangSwitch',
})

const props = withDefaults(defineProps<Props>(), {
  showTooltip: true,
})

const emit = defineEmits<Emits>()

interface Props {
  /** Current language */
  lang: App.I18n.LangType
  /** Language options */
  langOptions: App.I18n.LangOption[]
  /** Show tooltip */
  showTooltip?: boolean
}

type Emits = {
  (e: 'changeLang', lang: App.I18n.LangType): void
}

const tooltipContent = computed(() => {
  if (!props.showTooltip)
    return ''

  return $t('icon.lang')
})

function changeLang(lang: App.I18n.LangType) {
  emit('changeLang', lang)
}
</script>

<template>
  <NDropdown :value="lang" :options="langOptions" trigger="hover" @select="changeLang">
    <div id="global-lang-switch">
      <ButtonIcon :tooltip-content="tooltipContent" tooltip-placement="left">
        <SvgIcon icon="heroicons:language" />
      </ButtonIcon>
    </div>
  </NDropdown>
</template>

<style scoped></style>
