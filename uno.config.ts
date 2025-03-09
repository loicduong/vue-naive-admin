import type { Theme } from '@unocss/preset-wind3'
import presetWind3 from '@unocss/preset-wind3'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig } from '@unocss/vite'
import { themeVars } from './src/theme/vars'

export default defineConfig<Theme>({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist'],
    },
  },
  theme: {
    ...themeVars,
    fontSize: {
      'icon-xs': '0.875rem',
      'icon-small': '1rem',
      'icon': '1.125rem',
      'icon-large': '1.5rem',
      'icon-xl': '2rem',
    },
  },
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-x-center': 'flex justify-center',
      'flex-y-center': 'flex items-center',
      'flex-col': 'flex flex-col',
      'flex-col-center': 'flex-center flex-col',
      'flex-col-stretch': 'flex-col items-stretch',
      'i-flex-center': 'inline-flex justify-center items-center',
      'i-flex-x-center': 'inline-flex justify-center',
      'i-flex-y-center': 'inline-flex items-center',
      'i-flex-col': 'flex-col inline-flex',
      'i-flex-col-center': 'flex-col i-flex-center',
      'i-flex-col-stretch': 'i-flex-col items-stretch',
      'flex-1-hidden': 'flex-1 overflow-hidden',
    },
    {
      'absolute-lt': 'absolute left-0 top-0',
      'absolute-lb': 'absolute left-0 bottom-0',
      'absolute-rt': 'absolute right-0 top-0',
      'absolute-rb': 'absolute right-0 bottom-0',
      'absolute-tl': 'absolute-lt',
      'absolute-tr': 'absolute-rt',
      'absolute-bl': 'absolute-lb',
      'absolute-br': 'absolute-rb',
      'absolute-center': 'absolute-lt flex-center size-full',
      'fixed-lt': 'fixed left-0 top-0',
      'fixed-lb': 'fixed left-0 bottom-0',
      'fixed-rt': 'fixed right-0 top-0',
      'fixed-rb': 'fixed right-0 bottom-0',
      'fixed-tl': 'fixed-lt',
      'fixed-tr': 'fixed-rt',
      'fixed-bl': 'fixed-lb',
      'fixed-br': 'fixed-rb',
      'fixed-center': 'fixed-lt flex-center size-full',
    },
    {
      'nowrap-hidden': 'overflow-hidden whitespace-nowrap',
      'ellipsis-text': 'nowrap-hidden text-ellipsis',
    },
    {
      'card-wrapper': 'rd-8px shadow-sm',
    },
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetWind3({ dark: 'class' })],
})
