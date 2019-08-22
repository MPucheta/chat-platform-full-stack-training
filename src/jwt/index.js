import jsonwebtoken from 'jsonwebtoken'

const expiresIn = process.env.JWT_LIFESPAN || '10d'

function generateJWT (payload, subject) {
  return jsonwebtoken.sign(payload, process.env.SECRET, { subject, expiresIn })
}

export function generateJWTFromUser (user) {
  return generateJWT({ firstname: user.firstname, lastname: user.lastname, username: user.username }, user.id)
}
