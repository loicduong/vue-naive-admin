module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // A new feature
        'feat-wip', // Features in development, such as partial code for a certain feature
        'fix', // A bug fix
        'docs', // Documentation only changes
        'typo', // Code or document corrections, such as spelling errors
        'style', // Changes that do not affect the meaning of the code
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'perf', // A code change that improves performance
        'optimize', // A code change that optimizes code quality
        'test', // Adding missing tests or correcting existing tests
        'build', // Changes that affect the build system or external dependencies
        'ci', // Changes to our CI configuration files and scripts
        'chore', // Other changes that don't modify src or test files
        'revert', // Reverts a previous commit
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'projects', // project
        'packages', // packages
        'components', // components
        'hooks', // hook functions
        'utils', // utils functions
        'types', // TS declaration
        'styles', // style
        'deps', // project dependencies
        'release', // release project
        'other', // other changes
      ],
    ],
  },
}
