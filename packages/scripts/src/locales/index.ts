import { bgRed, green, red, yellow } from 'kolorist'

export type Lang = 'en-us'

export const locales = {
  'en-us': {
    gitCommitMessages: {
      types: 'Please select a type',
      scopes: 'Please select a scope',
      description: `Please enter a description (add prefix ${yellow('!')} to indicate breaking change)`,
    },
    gitCommitTypes: [
      ['feat', 'A new feature'],
      ['fix', 'A bug fix'],
      ['docs', 'Documentation only changes'],
      ['style', 'Changes that do not affect the meaning of the code'],
      ['refactor', 'A code change that neither fixes a bug nor adds a feature'],
      ['perf', 'A code change that improves performance'],
      ['optimize', 'A code change that optimizes code quality'],
      ['test', 'Adding missing tests or correcting existing tests'],
      ['build', 'Changes that affect the build system or external dependencies'],
      ['ci', 'Changes to our CI configuration files and scripts'],
      ['chore', 'Other changes that don\'t modify src or test files'],
      ['revert', 'Reverts a previous commit'],
    ] as [string, string][],
    gitCommitScopes: [
      ['projects', 'project'],
      ['packages', 'packages'],
      ['components', 'components'],
      ['hooks', 'hook functions'],
      ['utils', 'utils functions'],
      ['types', 'TS declaration'],
      ['styles', 'style'],
      ['deps', 'project dependencies'],
      ['release', 'release project'],
      ['other', 'other changes'],
    ] as [string, string][],
    gitCommitVerify: `${bgRed(' ERROR ')} ${red('git commit message must match the Conventional Commits standard!')}\n\n${green(
      'Recommended to use the command `pnpm commit` to generate Conventional Commits compliant commit information.\nGet more info about Conventional Commits, follow this link: https://conventionalcommits.org',
    )}`,
  },
} satisfies Record<Lang, Record<string, unknown>>
