import { getRgb } from '@/utils/color'
import systemLogo from '@/assets/svg-icon/logo.svg?raw'
import { DARK_CLASS } from '@/constants/app'
import { $t } from '@/locales'
import { toggleHtmlClass } from '@/utils/common'
import { localStg } from '@/utils/storage'

export function setupLoading() {
  const themeColor = localStg.get('themeColor') || '#646cff'

  const darkMode = localStg.get('darkMode') || false

  const { r, g, b } = getRgb(themeColor)

  const primaryColor = `--primary-color: ${r} ${g} ${b}`

  if (darkMode) {
    toggleHtmlClass(DARK_CLASS).add()
  }

  const loadingClasses = [
    'left-0 top-0',
    'left-0 bottom-0 [animation-delay:500ms]',
    'right-0 top-0 [animation-delay:1000ms]',
    'right-0 bottom-0 [animation-delay:1500ms]',
  ]

  const logoWithClass = systemLogo.replace('<svg', `<svg class="size-32 text-primary"`)

  const dot = loadingClasses
    .map(item => {
      return `<div class="absolute w-4 h-4 bg-primary rounded-lg animate-pulse ${item}"></div>`
    })
    .join('\n')

  const loading = `
    <div class="fixed left-0 top-0 flex items-center justify-center size-full flex-col bg-layout" style="${primaryColor}">
      ${logoWithClass}
      <div class="w-14 h-14 my-9">
        <div class="relative h-full animate-spin">
          ${dot}
        </div>
      </div>
      <h2 class="text-[28px] font-medium text-primary">${$t('system.title')}</h2>
    </div>
  `

  const app = document.getElementById('app')

  if (app) {
    app.innerHTML = loading
  }
}
