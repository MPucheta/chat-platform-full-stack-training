import crypto from 'crypto'

const ENCODING = 'hex'
const HASH_FUNCTION = 'md5'

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
    }
  })

  User.prototype.passwordMatches = async function (value) {
    const encryptedValue = await encryptValue(value)
    return (encryptedValue === this.password)
  }

  async function encryptValue (value, models = sequelize.models) {
    const hash = crypto.createHash(HASH_FUNCTION)

    const valueBuffer = Buffer.from([value])
    hash.update(valueBuffer)

    const salt = await models.salt.getPasswordSalt()
    const saltBuffer = Buffer.from([salt])
    hash.update(saltBuffer)

    const encryptedValue = hash.digest(ENCODING)

    return encryptedValue
  }

  User.hashPasswordHook = async function (user) {
    if (!user.password) {
      return user
    }

    user.password = await User.getEncryptedPassword(user.password)
  }

  User.getEncryptedPassword = async function (plainPassword) {
    return encryptValue(plainPassword)
  }

  User.beforeCreate(User.hashPasswordHook.bind(User))
  User.beforeUpdate(User.hashPasswordHook.bind(User))

  return User
}
