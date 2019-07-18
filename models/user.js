import encryptValue from '../encryption/encryption'

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

  User.prototype.passwordMatches = async function (value) {
    const encryptedValue = await encryptValue(value, this.salt)
    return (encryptedValue === this.password)
  }

  User.hashPasswordHook = async function (user) {
    if (!user.password) {
      return user
    }

    user.password = await User.getEncryptedPassword(user.password)
  }

  User.getEncryptedPassword = async function (plainPassword) {
    const encryptedValue = await encryptValue(plainPassword, this.salt)
    return encryptedValue
  }

  User.beforeCreate(User.hashPasswordHook.bind(User))
  User.beforeUpdate(User.hashPasswordHook.bind(User))

  return User
}
