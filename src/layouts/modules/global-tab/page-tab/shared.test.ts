import { describe, expect, it } from 'vite-plus/test'
import { isPrimaryPointer, isTapGesture, shouldSwitchTabOnPointerDown } from './shared'

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

describe('isTapGesture', () => {
  it('treats a press released in place as a tap', () => {
    expect(isTapGesture({ x: 100, y: 20 }, { x: 103, y: 22 })).toBe(true)
  })

  it('treats a horizontal swipe as a scroll, not a tap', () => {
    expect(isTapGesture({ x: 100, y: 20 }, { x: 160, y: 20 })).toBe(false)
  })

  it('treats a vertical move as a scroll, not a tap', () => {
    expect(isTapGesture({ x: 100, y: 20 }, { x: 100, y: 50 })).toBe(false)
  })
})
