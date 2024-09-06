import { localStg } from '@/utils/storage'
import { locale } from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/vi'

/**
 * Set dayjs locale
 *
 * @param lang
 */
export function setDayjsLocale(lang: App.I18n.LangType = 'vi-VN') {
  const localMap = {
    'vi-VN': 'vi',
    'en-US': 'en',
  } satisfies Record<App.I18n.LangType, string>

  const l = lang || localStg.get('lang') || 'vi-VN'

  locale(localMap[l])
}
