const winston = require('winston')
const config = require('../config/config')
const moment = require('moment')

const currentDateTimeFile = moment()
  .utc()
  .format('YYYY-MM-DD HH' + '00')
const filename = `${currentDateTimeFile}.log`
const currentDateTimeLog = moment().utc().format('YYYY-MM-DD HH:mm:ss.SSS')

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.splat(),
    winston.format.printf(
      ({ level, message }) => `${currentDateTimeLog}, ${message}`
    )
  ),

  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: filename,
      dirname: '../mcc-profile-mgmt-logs'
    })
  ]
})

module.exports = logger
