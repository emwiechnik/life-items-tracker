const SIGNATURE_LENGTH = 5

// This function was found somewhere on internet
function hash (s) {
  let a = 1
  let c = 0
  let h
  let o
  if (s) {
    a = 0
    for (h = s.length - 1; h >= 0; h--) {
      o = s.charCodeAt(h)
      a = (a << 6 & 268435455) + o + (o << 14)
      c = a & 266338304
      a = c !== 0 ? a ^ c >> 21 : a
    }
  }
  return String(a)
};

function getPaddedLast (v, number) {
  return v.slice(-number).padStart(number, '0')
}

const securityService = {
  extractSecuredString (str) {
    let decoded = atob(str)
    let original = decoded.slice(0, -SIGNATURE_LENGTH)
    let originalSignature = decoded.slice(-SIGNATURE_LENGTH)

    let hashed = hash(original)
    let hashedSignature = getPaddedLast(hashed, SIGNATURE_LENGTH)
    if (originalSignature === hashedSignature) {
      return original
    } else {
      return ''
    }
  },
  secureString (str) {
    let hashed = hash(str)
    let result = `${str}${getPaddedLast(hashed, SIGNATURE_LENGTH)}`
    let encoded = btoa(result)
    return encoded
  }
}

module.exports = securityService
