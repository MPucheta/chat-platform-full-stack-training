import { encryptValue, getRandomSalt } from '~/src/encryption'

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
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
    const encryptedPassword = User.getEncryptedPassword(password)
    return encryptedPassword === this.password
  }

  User.getEncryptedPassword = function (plainPassword) {
    const encryptedPassword = encryptValue(plainPassword, this.salt)
    return encryptedPassword
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
