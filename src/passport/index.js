import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import models from '~/src/models'

require('dotenv').config()

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.SECRET || 'secret'

const passportRef = passport.use(new JwtStrategy(options, async function (jwtPayload, done) {
  try {
    return done(null, await models.user.findOne({ where: { id: jwtPayload.sub } }))
  } catch (err) {
    return done(err)
  }
})
)

export { passportRef as passportMiddleWare }
