import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import models from '~/src/models'

require('dotenv').config()

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.SECRET

const passportRef = passport.use(new JwtStrategy(options, async function (jwtPayload, done) {
  let user, error
  try {
    user = await models.user.findOne({ where: { id: jwtPayload.sub } })
  } catch (err) {
    error = err
  }
  return done(error, user)
})
)

export { passportRef as passportMiddleWare }
