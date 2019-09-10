import dotenv from 'dotenv/config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import schema from './schema'
import { passportMiddleWare } from './passport'
import cors from 'cors'

const port = process.env.PORT || 3001
const server = new ApolloServer({
  ...schema,
  instrospection: true,
  playground: true,
  tracing: true,
  context: ({ req }) => ({ currentUser: req.user })
})

const app = express()

app.use(cors({
  origin: true,
  credentials: true
}))

app.use(passportMiddleWare.initialize())
app.use((req, res, next) => passportMiddleWare.authenticate('jwt', { session: false }, (_, user) => {
  req.user = user
  next()
})(req, res, next))

server.applyMiddleware({ app })

const httpServer = createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  console.log(
    `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
  )
})
