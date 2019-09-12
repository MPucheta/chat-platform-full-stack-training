const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEV,
    host: process.env.DB_ADDR,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    operatorsAliases: false
  }
}

module.exports = config
