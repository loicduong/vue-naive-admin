import { versionBump } from 'bumpp'

export async function release(execute = 'w3s changelogs', push = false) {
  await versionBump({
    files: ['**/package.json', '!**/node_modules'],
    execute,
    all: true,
    tag: false,
    commit: false,
    push,
  })
}
