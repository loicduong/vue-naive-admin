import { describe, expect, it } from 'vite-plus/test'
import { isPrimaryPointer } from './shared'

describe('isPrimaryPointer', () => {
  it('accepts the primary button', () => {
    expect(isPrimaryPointer({ button: 0 })).toBe(true)
  })

  it('rejects middle and right clicks, so the close icon does not swallow them', () => {
    expect(isPrimaryPointer({ button: 1 })).toBe(false)
    expect(isPrimaryPointer({ button: 2 })).toBe(false)
  })
})
