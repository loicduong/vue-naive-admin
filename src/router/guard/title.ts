import type { Router } from 'vue-router'
import { $t } from '@/locales'
import { useTitle } from '@vueuse/core'

export function createDocumentTitleGuard(router: Router) {
  if (import.meta.env.VITE_APP_TITLE_DYNAMIC === 'Y') {
    router.afterEach((to) => {
      const { i18nKey, title } = to.meta

      const documentTitle = i18nKey ? $t(i18nKey) : title

      useTitle(documentTitle)
    })
  }
}
