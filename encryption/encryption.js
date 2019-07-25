import crypto from 'crypto'

export const ENCODING = 'hex'
export const HASH_FUNCTION = 'md5'

export function encryptValue (value, salt) {
  const hash = crypto.createHash(HASH_FUNCTION)

  hash.update(value + salt)

  const encryptedValue = hash.digest(ENCODING)

  return encryptedValue
}

export function getRandomSalt (bytes = 16) {
  return crypto.randomBytes(bytes).toString(ENCODING)
}
