/** The union key namespace */
declare namespace UnionKey {
  /**
   * The login module
   *
   * - pwd-login: password login
   * - code-login: phone code login
   * - register: register
   * - reset-pwd: reset password
   */
  type LoginModule = 'pwd-login' | 'code-login' | 'register' | 'reset-pwd'

  /** Theme scheme */
  type ThemeScheme = 'light' | 'dark' | 'auto'

  /**
   * The layout mode
   *
   * - vertical: the vertical menu in left
   * - vertical-mix: two vertical mixed menus in left
   */
  type ThemeLayoutMode = 'vertical' | 'vertical-mix'

  /**
   * The scroll mode when content overflow
   *
   * - wrapper: the wrapper component's root element overflow
   * - content: the content component overflow
   */
  type ThemeScrollMode = import('@/layouts/modules/admin-layout/types').LayoutScrollMode

  /** Page animate mode */
  type ThemePageAnimateMode = 'fade' | 'fade-slide' | 'fade-bottom' | 'fade-scale' | 'zoom-fade' | 'zoom-out' | 'none'
}
