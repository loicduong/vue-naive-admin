import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    unocss: true,
    vue: true,
  },
  {
    rules: {
      // `type` object literals are relied on for index-signature assignability (TreeOption, BaseToken, i18n schema)
      'ts/consistent-type-definitions': 'off',
    },
  },
)
