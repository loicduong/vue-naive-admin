import type { App } from 'vue'
import { $t } from '@/locales'
import { NButton } from 'naive-ui'

// Update check interval in milliseconds
const UPDATE_CHECK_INTERVAL = 3 * 60 * 1000

export function setupAppErrorHandle(app: App) {
  app.config.errorHandler = (err, vm, info) => {
    console.error(err, vm, info)
  }
}

export function setupAppVersionNotification() {
  const canAutoUpdateApp = import.meta.env.VITE_AUTOMATICALLY_DETECT_UPDATE === 'Y'

  if (!canAutoUpdateApp)
    return

  let isShow = false
  let updateInterval: ReturnType<typeof setInterval> | undefined

  // Check if updates should be checked
  const shouldCheckForUpdates = [
    !isShow,
    document.visibilityState === 'visible',
    !import.meta.env.DEV,
  ].every(Boolean)

  const checkForUpdates = async () => {
    if (!shouldCheckForUpdates) {
      return
    }

    const buildTime = await getHtmlBuildTime()

    // If build time hasn't changed, no update is needed
    if (buildTime === BUILD_TIME) {
      return
    }

    isShow = true

    // Show update notification
    const n = window.$notification?.create({
      title: $t('system.updateTitle'),
      content: $t('system.updateContent'),
      action() {
        return (
          <div style={{ display: 'flex', justifyContent: 'end', gap: '12px', width: '325px' }}>
            <NButton onClick={() => n?.destroy()}>
              {$t('system.updateCancel')}
            </NButton>
            <NButton type="primary" onClick={() => location.reload()}>
              {$t('system.updateConfirm')}
            </NButton>
          </div>
        )
      },
      onClose() {
        isShow = false
      },
    })
  }

  function startUpdateInterval() {
    if (updateInterval) {
      clearInterval(updateInterval)
    }
    updateInterval = setInterval(checkForUpdates, UPDATE_CHECK_INTERVAL)
  }
  // If updates should be checked, set up the visibility change listener and start the update interval
  if (shouldCheckForUpdates) {
  // Check for updates when the document is visible
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        checkForUpdates()
        startUpdateInterval()
      }
    })
    // Start the update interval
    startUpdateInterval()
  }
}

async function getHtmlBuildTime() {
  const baseUrl = import.meta.env.VITE_BASE_URL || '/'

  const res = await fetch(`${baseUrl}index.html?time=${Date.now()}`)

  const html = await res.text()

  const match = html.match(/<meta name="build-time" content="([^"]*)">/)

  const buildTime = match?.[1] || ''

  return buildTime
}
