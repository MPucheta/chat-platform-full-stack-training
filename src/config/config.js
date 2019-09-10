const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DB_ADDR,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    operatorsAliases: false
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.DB_ADDR,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    operatorsAliases: false
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.PROD_DATABASE,
    host: process.env.DB_ADDR,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    operatorsAliases: false
  }
}

module.exports = config
