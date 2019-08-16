import { encryptValue, getRandomSalt } from '~/src/encryption'
import { generateJWT } from '~/src/jwt'

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  User.prototype.passwordMatches = function (password) {
    const encryptedPassword = this.getEncryptedPassword(password)

    return encryptedPassword === this.password
  }

  User.prototype.getEncryptedPassword = function (plainPassword) {
    return encryptValue(plainPassword, this.salt)
  }

  User.prototype.generateJWT = function () {
    return generateJWT({ username: this.username, firstname: this.firstname, lastname: this.lastname }, this.id)
  }

  User.hashPasswordHook = function (user) {
    if (!user.password || !user.changed('password')) {
      return user
    }
    user.salt = getRandomSalt()
    user.password = encryptValue(user.password, user.salt)
  }

  User.beforeValidate(User.hashPasswordHook.bind(User))
  User.beforeUpdate(User.hashPasswordHook.bind(User))

  return User
}
