export function isMobile() {
  const agents = [
    'Android',
    'iPhone',
    'webOS',
    'BlackBerry',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod',
  ]

  return agents.some(agent => window.navigator.userAgent.includes(agent))
}

export const isPC = () => !isMobile()
