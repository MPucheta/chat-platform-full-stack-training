import db from '../../../models/index'
import UserSequelizeModel from '../../../models/user'

const uuid = require('uuid/v4')
const UserModel = UserSequelizeModel(db.sequelize, db.Sequelize.DataTypes)

const resolvers = {
  Query: {

    users: () => {
      return UserModel.findAll()
        .then((users) => { return users })
    },

    user: (_, { username }) => {
      return UserModel.findOne({ where: { username: username } })
        .then((user) => { return user })
        .catch(`an error occurred when fetching user ${username}`)
    }

  },

  User: {

    id: (user) => {
      return user.id
    },
    firstName: (user) => {
      return user.firstName
    },
    lastName: (user) => {
      return user.lastName
    },
    username: (user) => {
      return user.username
    },
    password: (user) => {
      return user.password
    }

  },

  Mutation: {
    createUser: (_, { firstName, lastName, username, password }) => {
      const newUUID = uuid()

      return UserModel.create({
        id: newUUID,
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
      }).then(() => UserModel.findOrCreate({ where: { username: username } })
        .then(([user, created]) => { return user }))
        .catch(console.log(`An error occurred when creating a new user`))
    }
  }
}

export default resolvers
