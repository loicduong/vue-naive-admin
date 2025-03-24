/**
 * Namespace Env
 *
 * It is used to declare the type of the import.meta object
 */
declare namespace Env {
  /** The router history mode */
  type RouterHistoryMode = 'hash' | 'history' | 'memory'

  /** Interface for import.meta */
  interface ImportMeta extends ImportMetaEnv {
    /** The base url of the application */
    readonly VITE_BASE_URL: string
    /** The title of the application */
    readonly VITE_APP_TITLE: string
    /** The description of the application */
    readonly VITE_APP_DESC: string
    /** Whether to enable dynamic title */
    readonly VITE_APP_TITLE_DYNAMIC?: CommonType.YesOrNo
    /** The router history mode */
    readonly VITE_ROUTER_HISTORY_MODE?: RouterHistoryMode
    /** The prefix of the iconify icon */
    readonly VITE_ICON_PREFIX: 'icon'
    /**
     * The prefix of the local icon
     *
     * This prefix is start with the icon prefix
     */
    readonly VITE_ICON_LOCAL_PREFIX: 'local-icon'
    /** backend service base url */
    readonly VITE_SERVICE_BASE_URL: string
    /**
     * success code of backend service
     *
     * when the code is received, the request is successful
     *
     * use "," to separate multiple codes
     */
    readonly VITE_SERVICE_SUCCESS_CODES: string
    /**
     * logout codes of backend service
     *
     * when the code is received, the user will be logged out and redirected to login page
     *
     * use "," to separate multiple codes
     */
    readonly VITE_SERVICE_LOGOUT_CODES: string
    /**
     * other backend service base url
     *
     * the value is a json
     */
    readonly VITE_OTHER_SERVICE_BASE_URL: string
    /**
     * Whether to enable the http proxy
     *
     * Only valid in the development environment
     */
    readonly VITE_HTTP_PROXY?: CommonType.YesOrNo
    /** Whether to enable authentication, commonly used for demo projects */
    readonly VITE_AUTH_ROUTE_VISIBLE?: CommonType.YesOrNo
    /** The home route key */
    readonly VITE_ROUTE_HOME: App.Global.RoutePath
    /** Whether to redirect after login */
    readonly VITE_ROUTE_REDIRECT_AFTER_LOGIN?: CommonType.YesOrNo
    /**
     * Default menu icon if menu icon is not set
     *
     * Iconify icon name
     */
    readonly VITE_MENU_ICON: string
    /** Whether to build with sourcemap */
    readonly VITE_SOURCE_MAP?: CommonType.YesOrNo
    /**
     * Iconify api provider url
     *
     * If the project is deployed in intranet, you can set the api provider url to the local iconify server
     *
     * @link https://docs.iconify.design/api/providers.html
     */
    readonly VITE_ICONIFY_URL?: string
    /** Used to differentiate storage across different domains */
    readonly VITE_STORAGE_PREFIX?: string
    /** The port number on which the server is running */
    readonly VITE_SERVER_PORT?: number
    /** The port number used for previewing the application */
    readonly VITE_PREVIEW_PORT?: number
    /** Whether to automatically detect updates after configuring application packaging */
    readonly VITE_AUTOMATICALLY_DETECT_UPDATE?: CommonType.YesOrNo
    /** show proxy url log in terminal */
    readonly VITE_PROXY_LOG?: CommonType.YesOrNo
  }

  /** Used in the runtime.config.js file */
  type Runtime = keyof ImportMeta
}

interface ImportMeta {
  readonly env: Env.ImportMeta
}
