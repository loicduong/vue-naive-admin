import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite-plus'
import { createViteProxy, fmt, getBuildInfo, include, lint, staged } from './build/config'
import { setupVitePlugins } from './build/plugins'

export default defineConfig(configEnv => {
  const modeEnv = loadEnv(configEnv.mode, process.cwd())

  // fall back to .env.example for variables missing from the local env files (e.g. CI without a .env),
  // set on process.env so vite also exposes them to import.meta.env
  const exampleEnv = loadEnv('example', process.cwd())
  for (const [key, value] of Object.entries(exampleEnv)) {
    if (!(key in modeEnv)) process.env[key] = value
  }

  const viteEnv = { ...exampleEnv, ...modeEnv } as unknown as Env.ImportMeta

  const { desc, time, version } = getBuildInfo()

  const enableProxy = configEnv.command === 'serve' && !configEnv.isPreview

  return {
    fmt,
    lint,
    staged,
    base: viteEnv.VITE_BASE_URL,
    define: {
      BUILD_TIME: JSON.stringify(time),
      BUILD_DESC: JSON.stringify(desc),
    },
    plugins: setupVitePlugins(viteEnv, time, version),
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_SERVER_PORT,
      open: true,
      proxy: createViteProxy(viteEnv, enableProxy),
      warmup: { clientFiles: ['./index.html', './src/{pages,components}/*'] },
    },
    build: {
      sourcemap: viteEnv.VITE_SOURCE_MAP === 'Y',
      commonjsOptions: { ignoreTryCatch: false },
      reportCompressedSize: false,
    },
    preview: { port: viteEnv.VITE_PREVIEW_PORT },
    optimizeDeps: { include },
    worker: { format: 'es' },
  }
})
