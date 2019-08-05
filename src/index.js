
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import bodyParser from 'body-parser'

import schema from './schema'
import { passportMiddleWare } from './passport'
require('dotenv').config()

const port = process.env.PORT || 3001
const server = new ApolloServer({
  ...schema,
  instrospection: true,
  playground: true,
  tracing: true,
  context: ({ req }) => {
    const currentUser = req.user
    return { currentUser }
  }
})

const app = express()
app.use(passportMiddleWare.initialize())
app.use(passportMiddleWare.authenticate('jwt', { session: false }), (req, res, next) => {
  server.context({ req })
  next()
})

server.applyMiddleware({ app })

const httpServer = createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  console.log(
    `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
  )
})
