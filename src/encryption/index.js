import crypto from 'crypto'

export const ENCODING = 'hex'
export const HASH_FUNCTION = 'md5'

export function encryptValue (value, salt) {
  return crypto
    .createHash(HASH_FUNCTION)
    .update(value + salt)
    .digest(ENCODING)
}

export function getRandomSalt (bytes = 16) {
  return crypto.randomBytes(bytes).toString(ENCODING)
}
