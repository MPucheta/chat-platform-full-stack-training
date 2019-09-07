import { skip } from 'graphql-resolvers'

const requireAuthenticated = (root, args, context, info) => (
  context.currentUser
    ? skip
    : new Error('Not authenticated')
)

export default requireAuthenticated
