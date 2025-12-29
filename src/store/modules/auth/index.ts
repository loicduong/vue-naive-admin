import { useLoading } from '@sa/hooks'
import { defineStore } from 'pinia'
import { SetupStoreId } from '@/constants/enum'
import { useRouterPush } from '@/hooks/common/router'
import { $t } from '@/locales'
import { fetchGetUserInfo, fetchLogin } from '@/service/api'
import { localStg } from '@/utils/storage'
import { useRouteStore } from '../route'
import { useThemeStore } from '../theme'
import { clearAuthStorage, getToken } from './shared'

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  useThemeStore()
  const route = useRoute()
  const routeStore = useRouteStore()
  const { toLogin, redirectFromLogin } = useRouterPush(false)
  const { loading: loginLoading, startLoading, endLoading } = useLoading()

  const token = ref(getToken())

  const userInfo: Api.Auth.UserInfo = reactive({
    userId: '',
    userName: '',
    roles: [],
    buttons: [],
  })

  /** is super role */
  const isStaticSuper = computed(() => {
    return userInfo.roles.includes('R_SUPER')
  })

  /** Is login */
  const isLogin = computed(() => {
    return import.meta.env.VITE_AUTH_ROUTE_VISIBLE === 'N' || Boolean(token.value)
  })

  /** Reset auth store */
  async function resetStore() {
    const authStore = useAuthStore()

    clearAuthStorage()

    authStore.$reset()

    if (!route.meta.constant) {
      await toLogin()
    }

    routeStore.resetStore()
  }

  /**
   * Login
   *
   * @param userName User name
   * @param password Password
   * @param [redirect] Whether to redirect after login. Default is `true`
   */
  async function login(userName: string, password: string, redirect = true) {
    startLoading()

    const { data: loginToken, error } = await fetchLogin(userName, password)

    if (!error) {
      const pass = await loginByToken(loginToken)

      if (pass) {
        await redirectFromLogin(redirect)

        window.$notification?.success({
          title: $t('page.login.common.loginSuccess'),
          content: $t('page.login.common.welcomeBack', { userName: userInfo.userName }),
          duration: 4500,
        })
      }
    }
    else {
      resetStore()
    }

    endLoading()
  }

  async function loginByToken(loginToken: Api.Auth.LoginToken) {
    // 1. stored in the localStorage, the later requests need it in headers
    localStg.set('token', loginToken.token)
    localStg.set('refreshToken', loginToken.refreshToken)

    // 2. get user info
    const pass = await getUserInfo()

    if (pass) {
      token.value = loginToken.token

      return true
    }

    return false
  }

  async function getUserInfo() {
    const { data: info, error } = await fetchGetUserInfo()

    if (!error) {
      // update store
      Object.assign(userInfo, info)

      return true
    }

    return false
  }

  async function initUserInfo() {
    const hasToken = getToken()

    if (hasToken) {
      const pass = await getUserInfo()

      if (!pass) {
        resetStore()
      }
    }
  }

  return {
    token,
    userInfo,
    isStaticSuper,
    isLogin,
    loginLoading,
    resetStore,
    login,
    initUserInfo,
  }
})
