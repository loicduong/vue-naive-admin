import type { RequestInstanceState } from './type'
import { BACKEND_ERROR_CODE, createFlatRequest, createRequest } from '@sa/axios'
import { $t } from '@/locales'
import { useAuthStore } from '@/store/modules/auth'
import { getServiceBaseURL } from '@/utils/service'
import { localStg } from '@/utils/storage'
import { getAuthorization, showErrorMsg } from './shared'

const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y'
const { baseURL, otherBaseURL } = getServiceBaseURL(import.meta.env, isHttpProxy)

export const request = createFlatRequest<App.Service.Response, RequestInstanceState>(
  {
    baseURL,
    headers: {
      apifoxToken: 'XL299LiMEDZ0H5h3A29PxwQXdMJqWyY2',
    },
  },
  {
    async onRequest(config) {
      const Authorization = getAuthorization()
      Object.assign(config.headers, { Authorization })

      return config
    },
    isBackendSuccess(response) {
      // when the backend response code is "0000"(default), it means the request is success
      // to change this logic by yourself, you can modify the `VITE_SERVICE_SUCCESS_CODES` in `.env` file
      const codes = import.meta.env.VITE_SERVICE_SUCCESS_CODES?.split(',') || []
      return codes.includes(String(response.status))
    },
    async onBackendFail(response) {
      const authStore = useAuthStore()
      const responseCode = String(response.status)

      function handleLogout() {
        authStore.resetStore()
      }

      function logoutAndCleanup() {
        handleLogout()
        window.removeEventListener('beforeunload', handleLogout)

        request.state.errMsgStack = request.state.errMsgStack.filter(msg => msg !== response.data.msg)
      }

      // when the backend response code is in `logoutCodes`, it means the user will be logged out and redirected to login page
      const logoutCodes = import.meta.env.VITE_SERVICE_LOGOUT_CODES?.split(',') || []
      if (logoutCodes.includes(responseCode)) {
        handleLogout()
        return null
      }

      // when the backend response code is in `modalLogoutCodes`, it means the user will be logged out by displaying a modal
      const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || []
      if (modalLogoutCodes.includes(responseCode) && !request.state.errMsgStack?.includes(response.data.msg)) {
        request.state.errMsgStack = [...(request.state.errMsgStack || []), response.data.msg]

        // prevent the user from refreshing the page
        window.addEventListener('beforeunload', handleLogout)

        window.$dialog?.error({
          title: $t('common.error'),
          content: response.data.msg,
          positiveText: $t('common.confirm'),
          maskClosable: false,
          closeOnEsc: false,
          onPositiveClick() {
            logoutAndCleanup()
          },
          onClose() {
            logoutAndCleanup()
          },
        })

        return null
      }

      return null
    },
    transformBackendResponse(response) {
      return response.data.data
    },
    onError(error) {
      // when the request is fail, you can show error message
      let message = error.message

      // get backend error message and code
      if (error.code === BACKEND_ERROR_CODE) {
        message = error.response?.data?.msg || message
      }

      showErrorMsg(request.state, message)
    },
  },
)

export const demoRequest = createRequest<App.Service.DemoResponse>(
  {
    baseURL: otherBaseURL.demo,
  },
  {
    async onRequest(config) {
      const { headers } = config

      // set token
      const token = localStg.get('token')
      const Authorization = token ? `Bearer ${token}` : null
      Object.assign(headers, { Authorization })

      return config
    },
    isBackendSuccess(response) {
      // when the backend response code is "200", it means the request is success
      // you can change this logic by yourself
      return response.data.status === '200'
    },
    async onBackendFail(_response) {
      // when the backend response code is not "200", it means the request is fail
      // for example: the token is expired, refresh token and retry request
    },
    transformBackendResponse(response) {
      return response.data.result
    },
    onError(error) {
      // when the request is fail, you can show error message

      let message = error.message

      // show backend error message
      if (error.code === BACKEND_ERROR_CODE) {
        message = error.response?.data?.message || message
      }

      window.$message?.error(message)
    },
  },
)
