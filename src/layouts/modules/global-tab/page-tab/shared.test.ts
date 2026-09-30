import { describe, expect, it } from 'vite-plus/test'
import { isPrimaryPointer, shouldSwitchTabOnPointerDown } from './shared'

describe('shouldSwitchTabOnPointerDown', () => {
  it('switches on a primary mouse press', () => {
    expect(shouldSwitchTabOnPointerDown({ button: 0, pointerType: 'mouse' })).toBe(true)
  })

  it('does not switch when a touch starts, so a swipe can scroll the tab bar', () => {
    expect(shouldSwitchTabOnPointerDown({ button: 0, pointerType: 'touch' })).toBe(false)
  })

  it('does not switch on middle or right press', () => {
    expect(shouldSwitchTabOnPointerDown({ button: 1, pointerType: 'mouse' })).toBe(false)
    expect(shouldSwitchTabOnPointerDown({ button: 2, pointerType: 'mouse' })).toBe(false)
  })
})

describe('isPrimaryPointer', () => {
  it('accepts the primary button', () => {
    expect(isPrimaryPointer({ button: 0 })).toBe(true)
  })

  it('rejects middle and right clicks, so the close icon does not swallow them', () => {
    expect(isPrimaryPointer({ button: 1 })).toBe(false)
    expect(isPrimaryPointer({ button: 2 })).toBe(false)
  })
})
