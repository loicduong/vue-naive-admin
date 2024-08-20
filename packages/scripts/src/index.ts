import cac from 'cac'
import { blue, lightGreen } from 'kolorist'
import { version } from '../package.json'
import { generateRoute, release } from './commands'

type Command = 'release' | 'gen-route'

type CommandAction<A extends object> = (args?: A) => Promise<void> | void

type CommandWithAction<A extends object = object> = Record<Command, { desc: string, action: CommandAction<A> }>

interface CommandArg {
  /** Execute additional command after bumping and before git commit. Defaults to 'pnpm sa changelog' */
  execute?: string
  /** Indicates whether to push the git commit and tag. Defaults to true */
  push?: boolean
}

export async function setupCli() {
  const cli = cac(blue('sugatech'))

  cli
    .version(lightGreen(version))
    .option(
      '-e, --execute [command]',
      'Execute additional command after bumping and before git commit. Defaults to \'w3s changelogs\'',
    )
    .option('-p, --push', 'Indicates whether to push the git commit and tag')
    .help()

  const commands: CommandWithAction<CommandArg> = {
    'release': {
      desc: 'release: update version, generate changelog, commit code',
      action: async (args) => {
        await release(args?.execute, args?.push)
      },
    },
    'gen-route': {
      desc: 'generate route',
      action: async () => {
        await generateRoute()
      },
    },
  }

  for (const [command, { desc, action }] of Object.entries(commands)) {
    cli.command(command, lightGreen(desc)).action(action)
  }

  cli.parse()
}

setupCli()
