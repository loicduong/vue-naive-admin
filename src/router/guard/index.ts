import type { Router } from 'vue-router'
import { createRouteGuard } from './route'
import { createDocumentTitleGuard } from './title'

/**
 * Router guard
 *
 * @param router - Router instance
 */
export function createRouterGuard(router: Router) {
  createRouteGuard(router)
  createDocumentTitleGuard(router)
}
