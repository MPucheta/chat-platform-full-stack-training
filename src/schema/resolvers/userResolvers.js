import models from '~/src/models'

const resolvers = {
  Query: {
    users: () => models.user.findAll(),
    // when using only one parameter you can skip the usage of { }
    user: (_, username) => models.user.findOne({ where: username }),

    currentUser: (parent, args, context) => context.currentUser

  },

  Mutation: {
    createUser: (_, userData) => models.user.create(userData)
  }
}

export default resolvers
