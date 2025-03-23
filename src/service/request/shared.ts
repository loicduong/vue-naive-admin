import type { RequestInstanceState } from './type'
import { localStg } from '@/utils/storage'

export function getAuthorization() {
  const token = localStg.get('token')
  const Authorization = token ? `Bearer ${token}` : null

  return Authorization
}

export function showErrorMsg(state: RequestInstanceState, message: string) {
  if (!state.errMsgStack?.length) {
    state.errMsgStack = []
  }

  const isExist = state.errMsgStack.includes(message)

  if (!isExist) {
    state.errMsgStack.push(message)

    window.$message?.error(message, {
      onLeave: () => {
        state.errMsgStack = state.errMsgStack.filter(msg => msg !== message)

        setTimeout(() => {
          state.errMsgStack = []
        }, 5000)
      },
    })
  }
}
