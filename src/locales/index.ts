import type { App } from 'vue'
import { localStg } from '@/utils/storage'
import { createI18n } from 'vue-i18n'
import messages from './locale'

const i18n = createI18n({
  locale: localStg.get('lang') || 'en-US',
  fallbackLocale: 'en',
  messages,
  legacy: false,
})

/**
 * Setup plugin i18n
 *
 * @param app
 */
export function setupI18n(app: App) {
  app.use(i18n)
}

export const $t = i18n.global.t as App.I18n.$T

export function setLocale(locale: App.I18n.LangType) {
  i18n.global.locale.value = locale
}
