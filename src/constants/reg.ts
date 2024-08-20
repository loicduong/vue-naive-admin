export const REG_USER_NAME = /^[\u4E00-\u9FA5\w-]{4,16}$/

/** Phone reg */
export const REG_PHONE
  = /^1((3\d)|(4[014-9])|(5[0-35-9])|(6[2567])|(7[0-8])|(8\d)|(9[0-35-9]))\d{8}$/

/**
 * Password reg
 *
 * 6-18 characters, including letters, numbers, and underscores
 */
export const REG_PWD = /^\w{6,18}$/

/** Email reg */
export const REG_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

/** Six digit code reg */
export const REG_CODE_SIX = /^\d{6}$/

/** Four digit code reg */
export const REG_CODE_FOUR = /^\d{4}$/

/** Url reg */
export const REG_URL
  = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-]*)?\??[-+=&;%@.\w]*(?:#\w*)?)?)$/
