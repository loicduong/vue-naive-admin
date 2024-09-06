import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    regexp: false,
    unocss: true,
    vue: true,
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'ts/no-unsafe-function-type': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unocss/order-attributify': 'off',
      'vue/block-order': ['warn', { order: ['script', 'template', 'style'] }],
      'vue/component-api-style': ['warn', ['script-setup', 'composition']],
      'vue/component-name-in-template-casing': [
        'warn',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: ['/^icon-/'],
        },
      ],
      'vue/component-options-name-casing': ['warn', 'PascalCase'],
      'vue/custom-event-name-casing': ['warn', 'camelCase'],
      'vue/define-emits-declaration': ['warn', 'type-based'],
      'vue/define-macros-order': 'off',
      'vue/define-props-declaration': ['warn', 'type-based'],
      'vue/html-comment-content-newline': 'warn',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: Infinity,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index', 'App', 'Register', '[id]', '[url]'],
        },
      ],
      'vue/next-tick-style': ['warn', 'promise'],
      'vue/no-duplicate-attr-inheritance': 'warn',
      'vue/no-required-prop-with-default': 'warn',
      'vue/no-static-inline-styles': 'warn',
      'vue/no-template-target-blank': 'error',
      'vue/no-this-in-before-route-enter': 'error',
      'vue/no-undef-properties': 'warn',
      'vue/no-unsupported-features': 'warn',
      'vue/no-unused-emit-declarations': 'warn',
      'vue/no-unused-properties': 'warn',
      'vue/no-unused-refs': 'warn',
      'vue/no-use-v-else-with-v-for': 'error',
      'vue/no-useless-mustaches': 'warn',
      'vue/no-useless-v-bind': 'error',
      'vue/no-v-text': 'warn',
      'vue/padding-line-between-blocks': 'warn',
      'vue/prefer-define-options': 'warn',
      'vue/prefer-separate-static-class': 'warn',
      'vue/prop-name-casing': ['warn', 'camelCase'],
      'vue/require-macro-variable-name': [
        'warn',
        {
          defineProps: 'props',
          defineEmits: 'emit',
          defineSlots: 'slots',
          useSlots: 'slots',
          useAttrs: 'attrs',
        },
      ],
      'vue/valid-define-options': 'warn',
    },
  },
)
