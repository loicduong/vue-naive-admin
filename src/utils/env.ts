export function getEnvVariable(name: Env.Runtime, env?: Env.ImportMeta): string {
  return typeof window === 'undefined'
    ? env?.[name] || import.meta.env[name]
    : window.config?.[name] || env?.[name] || import.meta.env[name]
}
