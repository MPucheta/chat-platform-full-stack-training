import { combineResolvers } from 'graphql-resolvers'
import models from '~/src/models'
import requireAuthenticated from '../requireAuthenticated'

const currentUser = (root, args, context, info) => context.currentUser

const resolvers = {
  Query: {
    users: () => models.user.findAll(),

    user: (_, username) => models.user.findOne({ where: username }),

    currentUser: combineResolvers(requireAuthenticated, currentUser)
  },

  Mutation: {
    createUser: (_, userData) => models.user.create(userData)
  }
}

export default resolvers
