import { SetupStoreId } from '@/constants/enum'
import { jsonClone } from '@sa/utils'
import type { PiniaPluginContext } from 'pinia'

/**
 * The plugin reset the state of the store which is written by setup syntax
 *
 * @param context
 */
export function resetSetupStore(context: PiniaPluginContext) {
  const setupSyntaxIds = Object.values(SetupStoreId) as string[]

  if (setupSyntaxIds.includes(context.store.$id)) {
    const { $state } = context.store

    const defaultStore = jsonClone($state)

    context.store.$reset = () => {
      context.store.$patch(defaultStore)
    }
  }
}
