const app = require('./app')
const logger = require('./src/utilities/logger')
const sequelize = require('./src/config/sequelize')

let server
sequelize
  .authenticate()
  .then(() => {
    sequelize.sync({ alter: false })
    logger.info('"server.js","sequelize()","Connected to DB."')
    app.listen(process.env.APP_PORT, () => {
      logger.info(
        `"server.js","sequelize()","App running on port ${process.env.APP_PORT}..."`
      )
    })
  })
  .catch((err) => {
    logger.error(
      `"server.js","sequelize()","Unable to connect to the database: ${err.message}"`
    )
  })
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('"server.js","exitHandler()"," Server closed"')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  logger.error(`"server.js","unexpectedErrorHandler()","${error.message}"`)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('"server.js","SIGTERM()","SIGTERM received"')
  if (server) {
    server.close()
  }
})
