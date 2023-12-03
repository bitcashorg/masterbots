import _ from 'lodash'

// TODO: Check TS failing to know window object...
export const platform = (() => {
  // @ts-ignore
  const isBrowser = typeof window !== 'undefined'
  // @ts-ignore
  const userAgent = isBrowser ? _.get(window, 'navigator.userAgent') : ''
  const isAndroid = /(Android)/i.test(userAgent)
  const isPhone = /(iPhone|iPod)/i.test(userAgent)
  const isIpad = /(iPad)/i.test(userAgent)
  const isMobile = isPhone || isAndroid
  // @ts-ignore
  const solana = isBrowser && _.get(window, 'solana')
  // @ts-ignore
  const isPhantom = isBrowser && _.has(window, 'solana.isPhantom')

  return {
    userAgent,
    isBrowser,
    isNode: !isBrowser,
    isPhone,
    isIpad,
    isMobile,
    isPhantom,
    solana,
  }
})()
