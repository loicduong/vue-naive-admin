type Kebab<S extends string> = S extends Uncapitalize<S> ? S : `-${Uncapitalize<S>}`

type KebabCase<S extends string> = S extends `${infer Start}${infer End}`
  ? `${Uncapitalize<Start>}${KebabCase<Kebab<End>>}`
  : S

type Prefix = '--soy-'

/**
 * The mode of the tab
 *
 * - button: button style
 * - chrome: chrome style
 * - slider: slider style
 *
 * @default chrome
 */
export type PageTabMode = UnionKey.ThemeTabMode

export interface PageTabProps {
  /** Whether is dark mode */
  darkMode?: boolean
  /** The mode of the tab */
  mode?: PageTabMode
  /**
   * The common class of the layout
   *
   * Is can be used to configure the transition animation
   *
   * @default 'transition-all-300'
   */
  commonClass?: string
  /** The class of the button tab */
  buttonClass?: string
  /** The class of the chrome tab */
  chromeClass?: string
  /** The class of the slider tab */
  sliderClass?: string
  /** Whether the tab is active */
  active?: boolean
  /** The color of the active tab */
  activeColor?: string
  /**
   * Whether the tab is closable
   *
   * Show the close icon when true
   */
  closable?: boolean
}

export interface PageTabCssVarsProps {
  primaryColor: string
  primaryColor1: string
  primaryColor2: string
  primaryColorOpacity1: string
  primaryColorOpacity2: string
  primaryColorOpacity3: string
}

export type PageTabCssVars = {
  [K in keyof PageTabCssVarsProps as `${Prefix}${KebabCase<K>}`]: string | number
}
