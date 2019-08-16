import models from '~/src/models'

const resolvers = {
  Mutation: {
    signin: async (_, signInInput) => {
      try {
        const user = await models.user.findOne({ where: { username: signInInput.data.username } })

        if (!user) {
          throw new Error("Username doesn't exist")
        }
        if (!user.passwordMatches(signInInput.data.password)) {
          throw new Error('Password does not match')
        }

        const jwt = user.generateJWT()

        return ({ user, jwt, authError: null })
      } catch (err) {
        return ({ user: null, jwt: null, authError: err })
      }
    }
  }
}

export default resolvers
