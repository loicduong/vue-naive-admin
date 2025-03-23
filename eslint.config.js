import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    regexp: false,
    unocss: true,
    vue: true,
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      'unocss/order-attributify': 'off',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: Infinity },
          multiline: { max: 1 },
        },
      ],
    },
  },
)
