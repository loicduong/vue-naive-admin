import type { PageTabCssVars, PageTabCssVarsProps } from './types'
import { addColorAlpha, transformColorWithOpacity } from '@/utils/color'

/**
 * Whether a pointer event comes from the primary button (left mouse button, touch or pen contact)
 *
 * @param event
 */
export function isPrimaryPointer(event: Pick<PointerEvent, 'button'>) {
  return event.button === 0
}

/**
 * Whether pressing a tab should switch to it right away
 *
 * Touch presses may start a swipe of the tab bar, so they switch on the (scroll-aware) click instead
 *
 * @param event
 */
export function shouldSwitchTabOnPointerDown(event: Pick<PointerEvent, 'button' | 'pointerType'>) {
  return isPrimaryPointer(event) && event.pointerType !== 'touch'
}

/** The active color of the tab */
export const ACTIVE_COLOR = '#1890ff'

function createCssVars(props: PageTabCssVarsProps) {
  const cssVars: PageTabCssVars = {
    '--soy-primary-color': props.primaryColor,
    '--soy-primary-color1': props.primaryColor1,
    '--soy-primary-color2': props.primaryColor2,
    '--soy-primary-color-opacity1': props.primaryColorOpacity1,
    '--soy-primary-color-opacity2': props.primaryColorOpacity2,
    '--soy-primary-color-opacity3': props.primaryColorOpacity3,
  }

  return cssVars
}

export function createTabCssVars(primaryColor: string) {
  const cssProps: PageTabCssVarsProps = {
    primaryColor,
    primaryColor1: transformColorWithOpacity(primaryColor, 0.1, '#ffffff'),
    primaryColor2: transformColorWithOpacity(primaryColor, 0.3, '#000000'),
    primaryColorOpacity1: addColorAlpha(primaryColor, 0.1),
    primaryColorOpacity2: addColorAlpha(primaryColor, 0.15),
    primaryColorOpacity3: addColorAlpha(primaryColor, 0.3),
  }

  return createCssVars(cssProps)
}
