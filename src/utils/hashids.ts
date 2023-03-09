import Hashids from 'hashids'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
const SALT = 'eXVueXU='
const HASH_MIN_LENGTH = 64
export const toHex = (str: string) => {
  var result = ''
  for (var i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16)
  }
  return result
}
class Hash {
  static hashids = new Hashids(SALT, HASH_MIN_LENGTH, ALPHABET)

  public static encode(key: string) {
    const vaule = toHex(key)
    return this.hashids.encodeHex(vaule)
  }
  public static decode(key: string) {
    if (!key) return ''
    return Buffer.from(this.hashids.decodeHex(key), 'hex').toString('utf8')
  }
}

export default Hash
