import jsonwebtoken from 'jsonwebtoken'

const expiresIn = process.env.JWT_LIFESPAN || '10d'

export function generateJWT (payload, subject) {
  return jsonwebtoken.sign(payload, process.env.SECRET, { subject, expiresIn })
}
