import type { Router } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { $t } from '@/locales'

export function createDocumentTitleGuard(router: Router) {
  if (import.meta.env.VITE_APP_TITLE_DYNAMIC === 'Y') {
    router.afterEach((to) => {
      const { i18nKey, title } = to.meta

      const documentTitle = i18nKey ? $t(i18nKey) : title

      useTitle(documentTitle)
    })
  }
}
