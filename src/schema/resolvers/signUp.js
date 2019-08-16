import models from '~/src/models'

const resolvers = {
  Mutation: {
    signup: async (_, signUpInput) => {
      try {
        const user = await models.user.create(signUpInput.data)
        const jwt = user.generateJWT()

        return ({ user, jwt, authError: null })
      } catch (err) {
        return ({ user: null, jwt: null, authError: err })
      }
    }
  }
}

export default resolvers
