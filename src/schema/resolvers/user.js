import models from '~/src/models'

const resolvers = {
  Query: {
    users: () => models.user.findAll(),

    user: (_, username) => models.user.findOne({ where: username }),

    currentUser: (parent, args, context) => context.currentUser

  },

  Mutation: {
    createUser: (_, userData) => models.user.create(userData)
  }
}

export default resolvers
