/** Create color palette vars */
function createColorPaletteVars() {
  const colors: App.Theme.ThemeColorKey[] = ['primary', 'info', 'success', 'warning', 'error']
  const colorPaletteNumbers: App.Theme.ColorPaletteNumber[] = [100, 200, 300, 400, 500, 600, 700, 800, 900]

  const colorPaletteVar = {} as App.Theme.ThemePaletteColor

  colors.forEach((color) => {
    colorPaletteVar[color] = `rgb(var(--${color}-color))`
    colorPaletteNumbers.forEach((number) => {
      colorPaletteVar[`${color}-${number}`] = `rgb(var(--${color}-${number}-color))`
    })
  })

  return colorPaletteVar
}

const colorPaletteVars = createColorPaletteVars()

/** Theme vars */
export const themeVars: App.Theme.ThemeTokenCSSVars = {
  colors: {
    ...colorPaletteVars,
    'container': 'rgb(var(--container-bg-color))',
    'layout': 'rgb(var(--layout-bg-color))',
    'base-text': 'rgb(var(--base-text-color))',
  },
  boxShadow: {
    header: 'var(--header-box-shadow)',
    sider: 'var(--sider-box-shadow)',
  },
}
