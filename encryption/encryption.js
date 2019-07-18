import crypto from 'crypto'

export const ENCODING = 'hex'
export const HASH_FUNCTION = 'md5'

export default async function encryptValue (value, saltModel) {
  const hash = crypto.createHash(HASH_FUNCTION)

  const valueBuffer = Buffer.from([value])
  hash.update(valueBuffer)

  const salt = await saltModel.getPasswordSalt()
  const saltBuffer = Buffer.from([salt])
  hash.update(saltBuffer)

  const encryptedValue = hash.digest(ENCODING)

  return encryptedValue
}
