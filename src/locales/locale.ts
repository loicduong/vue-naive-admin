import enUS from './langs/en-us'
import viVN from './langs/vi-vn'

const locales: Record<App.I18n.LangType, App.I18n.Schema> = {
  'vi-VN': viVN,
  'en-US': enUS,
}

export default locales
