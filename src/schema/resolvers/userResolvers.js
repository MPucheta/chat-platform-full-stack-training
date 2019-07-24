class User {
  constructor (id, firstName, lastName, username, password, salt) {
    this._id = id
    this._firstName = firstName
    this._lastName = lastName
    this._username = username
    this._password = password
    this._salt = salt
  }

  // getters/setters if we ever need to enforce some rules
  // for example, not allowing the salt to change
  get id () {
    return this._id
  }

  set id (id) {
    this._id = id
  }

  get firstName () {
    return this._firstName
  }

  set firstName (firstName) {
    this._firstName = firstName
  }

  get lastName () {
    return this._lastName
  }

  set lastName (lastName) {
    this._lastName = lastName
  }

  get username () {
    return this._username
  }

  set username (username) {
    this._username = username
  }

  get password () {
    return this._password
  }

  set password (password) {
    this._password = password
  }

  get salt () {
    return this._salt
  }

  set salt (salt) {
    this._salt = salt
  }
}

const userFakeDatabase = []
userFakeDatabase.push(new User(0, 'firstName0', 'lastname0', 'username0', 'password0', 'saltShouldNotBeShownFor0'))
userFakeDatabase.push(new User(1, 'firstName1', 'lastname1', 'username1', 'password1', 'saltShouldNotBeShownFor1'))

const resolvers = {
  Query: {

    users: () => {
      /*
      Placeholder for sequelize implementation:
      User.findAll()
      .then( (users) => return users)
      */
      return userFakeDatabase
    },

    user: (_, { id }) => {
      /*
      Placeholder for sequelize implementation:
      User.findOne( { where: { id : id}})
      .then( (user) => return user)
      .catch(`an error occurred when fetching user ${id}`)
      */
      return userFakeDatabase.find((user) => user.id === id)
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
    },
    salt: (user) => {
      return user.salt
    }

  },

  Mutation: {
    createUser: (_, { id, firstName, lastName, username, password, salt }) => {
      const newUser = new User(id, firstName, lastName, username, password, salt)
      userFakeDatabase.push(newUser)
      return newUser

      /*
         PlaceHolder for sequelize implementation:
      const newUser
      User.create({ id: id, firstName: firstName, lastName: lastName, username: username, password: password, salt: salt })
      .then( () => User.findOrCreate( { where: { username: username} })
      .then( ([user, created]) => newUser = user))
      .then( return newUser ) //I am not sure if putting this return in the function's body will work as I think newUser would be undefined before the execution of the Promise
      .catch( console.log(`An error occurred when creating a new user`))
      */
    }
  }
}

export default resolvers
