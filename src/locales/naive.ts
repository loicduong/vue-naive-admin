import type { NDateLocale, NLocale } from 'naive-ui'
import { dateEnUS, dateViVN, enUS, viVN } from 'naive-ui'

export const naiveLocales: Record<App.I18n.LangType, NLocale> = {
  'vi-VN': viVN,
  'en-US': enUS,
}

export const naiveDateLocales: Record<App.I18n.LangType, NDateLocale> = {
  'vi-VN': dateViVN,
  'en-US': dateEnUS,
}
