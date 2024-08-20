module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    commit =>
      commit.includes('init')
      || /^dev\d+\.\d+\.\d+/.test(commit),
  ],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-case': [2, 'always', 'sentence-case'],
    'type-enum': [
      2,
      'always',
      [
        /** add code */
        'Add',
        /** changes related to the build process */
        'Build',
        /** other changes that do not affect src or test files */
        'Chore',
        /** documentation changes only */
        'Docs',
        /** fix a bug */
        'Fix',
        /** performance improvements */
        'Optz',
        /** add missing test cases or update existing ones */
        'Test',
        /** modify code */
        'Update',
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        /** common technical */
        'core',
        /** common */
        'main',
      ],
    ],
  },
}
