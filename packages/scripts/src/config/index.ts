import process from 'node:process'
import { loadConfig } from 'c12'
import type { CliOption } from '../types'

const defaultOptions: CliOption = {
  cwd: process.cwd(),
}

export async function loadCliOptions(overrides?: Partial<CliOption>, cwd = process.cwd()) {
  const { config } = await loadConfig<Partial<CliOption>>({
    name: 'sugatech',
    defaults: defaultOptions,
    overrides,
    cwd,
    packageJson: true,
  })

  return config as CliOption
}
