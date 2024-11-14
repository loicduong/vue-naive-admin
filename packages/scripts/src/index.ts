import cac from 'cac'
import { blue, lightGreen } from 'kolorist'
import { version } from '../package.json'
import { cleanup, genChangelog, release, updatePkg } from './commands'
import { loadCliOptions } from './config'

type Command = 'cleanup' | 'update-pkg' | 'changelog' | 'release'

type CommandAction<A extends object> = (args?: A) => Promise<void> | void

type CommandWithAction<A extends object = object> = Record<Command, { desc: string, action: CommandAction<A> }>

interface CommandArg {
  /** Execute additional command after bumping and before git commit. Defaults to 'pnpm sa changelog' */
  execute?: string
  /** Indicates whether to push the git commit and tag. Defaults to true */
  push?: boolean
  /** Generate changelog by total tags */
  total?: boolean
  /**
   * The glob pattern of dirs to clean up
   *
   * If not set, it will use the default value
   *
   * Multiple values use "," to separate them
   */
  cleanupDir?: string
}

export async function setupCli() {
  const cliOptions = await loadCliOptions()

  const cli = cac(blue('soybean-admin'))

  cli
    .version(lightGreen(version))
    .option(
      '-e, --execute [command]',
      'Execute additional command after bumping and before git commit. Defaults to \'npx soy changelog\'',
    )
    .option('-p, --push', 'Indicates whether to push the git commit and tag')
    .option('-t, --total', 'Generate changelog by total tags')
    .option(
      '-c, --cleanupDir <dir>',
      'The glob pattern of dirs to cleanup, If not set, it will use the default value, Multiple values use "," to separate them',
    )
    .help()

  const commands: CommandWithAction<CommandArg> = {
    'cleanup': {
      desc: 'delete dirs: node_modules, dist, etc.',
      action: async () => {
        await cleanup(cliOptions.cleanupDirs)
      },
    },
    'update-pkg': {
      desc: 'update package.json dependencies versions',
      action: async () => {
        await updatePkg(cliOptions.ncuCommandArgs)
      },
    },
    'changelog': {
      desc: 'generate changelog',
      action: async (args) => {
        await genChangelog(cliOptions.changelogOptions, args?.total)
      },
    },
    'release': {
      desc: 'release: update version, generate changelog, commit code',
      action: async (args) => {
        await release(args?.execute, args?.push)
      },
    },
  }

  for (const [command, { desc, action }] of Object.entries(commands)) {
    cli.command(command, lightGreen(desc)).action(action)
  }

  cli.parse()
}

setupCli()
