import useSvgIconRender from '@/hooks/common/use-svg-icon-render'
import SvgIcon from '@/components/custom/svg-icon.vue'

export function useSvgIcon() {
  const { SvgIconVNode } = useSvgIconRender(SvgIcon)

  return {
    SvgIconVNode,
  }
}
