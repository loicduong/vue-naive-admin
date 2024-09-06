import SvgIcon from '@/components/custom/svg-icon.vue'
import { useSvgIconRender } from '@sa/hooks'

export function useSvgIcon() {
  const { SvgIconVNode } = useSvgIconRender(SvgIcon)

  return {
    SvgIconVNode,
  }
}
