import type { App } from 'vue'
import { directive as tippy } from 'vue-tippy'

/** Setup plugin VueTippy */
export function setupVueTippy(app: App) {
  app.directive('tippy', tippy)
}
