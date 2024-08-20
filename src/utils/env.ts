export function getEnvVariable(name: Env.Runtime, env?: Env.ImportMeta): CommonType.NullableString {
  return window.config?.[name] || (env ? env[name] : import.meta.env[name])
}
