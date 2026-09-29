import localforageLib from 'localforage'

/** The storage type */
type WebStorageType = 'local' | 'session'

export function createStorage<T extends object>(type: WebStorageType, storagePrefix: string) {
  const stg = type === 'session' ? window.sessionStorage : window.localStorage

  const storage = {
    /**
     * Set session
     *
     * @param key Session key
     * @param value Session value
     */
    set<K extends keyof T>(key: K, value: T[K]) {
      const json = JSON.stringify(value)

      stg.setItem(`${storagePrefix}${key as string}`, json)
    },
    /**
     * Get session
     *
     * @param key Session key
     */
    get<K extends keyof T>(key: K): T[K] | null {
      const json = stg.getItem(`${storagePrefix}${key as string}`)
      if (json) {
        let storageData: T[K] | null = null

        try {
          storageData = JSON.parse(json)
        } catch {}

        // storageData may be `false` if it is boolean type
        if (storageData !== null) {
          return storageData as T[K]
        }
      }

      stg.removeItem(`${storagePrefix}${key as string}`)

      return null
    },
    remove(key: keyof T) {
      stg.removeItem(`${storagePrefix}${key as string}`)
    },
    clear() {
      stg.clear()
    },
  }
  return storage
}

type LocalForage<T extends object> = Omit<typeof localforageLib, 'getItem' | 'setItem' | 'removeItem'> & {
  getItem: <K extends keyof T>(key: K, callback?: (err: any, value: T[K] | null) => void) => Promise<T[K] | null>

  setItem: <K extends keyof T>(key: K, value: T[K], callback?: (err: any, value: T[K]) => void) => Promise<T[K]>

  removeItem: (key: keyof T, callback?: (err: any) => void) => Promise<void>
}

type LocalforageDriver = 'local' | 'indexedDB' | 'webSQL'

export function createLocalforage<T extends object>(driver: LocalforageDriver) {
  const driverMap: Record<LocalforageDriver, string> = {
    local: localforageLib.LOCALSTORAGE,
    indexedDB: localforageLib.INDEXEDDB,
    webSQL: localforageLib.WEBSQL,
  }

  localforageLib.config({
    driver: driverMap[driver],
  })

  return localforageLib as LocalForage<T>
}

const storagePrefix = import.meta.env.VITE_STORAGE_PREFIX || ''

export const localStg = createStorage<StorageType.Local>('local', storagePrefix)

export const sessionStg = createStorage<StorageType.Session>('session', storagePrefix)

export const localforage = createLocalforage<StorageType.Local>('local')
