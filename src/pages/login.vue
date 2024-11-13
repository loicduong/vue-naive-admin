<script setup lang="ts">
import CodeLogin from '@/components/modules/login/code-login.vue'
import PwdLogin from '@/components/modules/login/pwd-login.vue'
import Register from '@/components/modules/login/register.vue'
import ResetPwd from '@/components/modules/login/reset-pwd.vue'
import { loginModuleRecord } from '@/constants/app'
import { $t } from '@/locales'
import { useAppStore } from '@/store/modules/app'
import { useThemeStore } from '@/store/modules/theme'
import { getPaletteColorByNumber, mixColor } from '@sa/color'

interface Props {
  /** The login module */
  module?: UnionKey.LoginModule
}

definePage({
  props: true,
})

const props = defineProps<Props>()

const appStore = useAppStore()
const themeStore = useThemeStore()

interface LoginModule {
  label: string
  component: Component
}

const moduleMap: Record<UnionKey.LoginModule, LoginModule> = {
  'pwd-login': { label: loginModuleRecord['pwd-login'], component: PwdLogin },
  'code-login': { label: loginModuleRecord['code-login'], component: CodeLogin },
  'register': { label: loginModuleRecord.register, component: Register },
  'reset-pwd': { label: loginModuleRecord['reset-pwd'], component: ResetPwd },
}

const activeModule = computed(() => moduleMap[props.module || 'pwd-login'])

const bgThemeColor = computed(() =>
  themeStore.darkMode ? getPaletteColorByNumber(themeStore.themeColor, 600) : themeStore.themeColor,
)

const bgColor = computed(() => {
  const COLOR_WHITE = '#ffffff'

  const ratio = themeStore.darkMode ? 0.5 : 0.2

  return mixColor(COLOR_WHITE, themeStore.themeColor, ratio)
})
</script>

<template>
  <div class="relative size-full flex-center overflow-hidden" :style="{ backgroundColor: bgColor }">
    <WaveBg :theme-color="bgThemeColor" />
    <NCard :bordered="false" class="relative z-4 w-auto rd-12px">
      <div class="w-400px lt-sm:w-300px">
        <header class="flex-y-center justify-between">
          <SystemLogo class="text-64px text-primary lt-sm:text-48px" />
          <h3 class="text-28px text-primary font-500 lt-sm:text-22px">
            {{ $t('system.title') }}
          </h3>
          <div class="i-flex-col">
            <ThemeSchemaSwitch
              :theme-schema="themeStore.themeScheme"
              :show-tooltip="false"
              class="text-20px lt-sm:text-18px"
              @switch="themeStore.toggleThemeScheme"
            />
            <LangSwitch
              :lang="appStore.locale"
              :lang-options="appStore.localeOptions"
              :show-tooltip="false"
              @change-lang="appStore.changeLocale"
            />
          </div>
        </header>
        <main class="pt-24px">
          <h3 class="text-18px text-primary font-medium">
            {{ $t(activeModule.label) }}
          </h3>
          <div class="pt-24px">
            <Transition :name="themeStore.page.animateMode" mode="out-in" appear>
              <component :is="activeModule.component" />
            </Transition>
          </div>
        </main>
      </div>
    </NCard>
  </div>
</template>

<style scoped></style>
