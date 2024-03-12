const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('./src/utilities/logger')
const routes = require('./src/routes/v1')

const app = express()
app.use(cors())

// parse json request body
app.use(express.json())
// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(
    `Server running Successfully at port ${process.env.APP_PORT} on ${process.env.NODE_ENV}`
  )
})

const checkHeartbeat = (req, res) => {
  try {
    logger.info('"app.js","checkHeartbeat()","Heartbeat received!!!"')
    res.sendStatus(200)
  } catch (error) {
    logger.error(
      `"app.js","checkHeartbeat()","Error receiving heartbeat: ${error.message}"`
    )
    res.sendStatus(500)
  }
}

app.get('/profile/heartbeat', checkHeartbeat)
app.disable('x-powered-by')
app.use((req, res, next) => {
  res.removeHeader('Server')
  next()
})

app.use(`/${process.env.API_PREFIX}/${process.env.VERSION_V1}`, routes)

module.exports = app
