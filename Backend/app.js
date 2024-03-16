const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('./src/utilities/logger')
const routes = require('./src/routes/v1')
const Razorpay = require('razorpay')

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

app.get('/heartbeat', checkHeartbeat)
app.disable('x-powered-by')
app.use((req, res, next) => {
  res.removeHeader('Server')
  next()
})

app.post('/order', async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET
    })

    const options = req.body
    const order = await razorpay.orders.create(options)

    if (!order) {
      return res.status(500).send('Error')
    }

    res.json(order)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error')
  }
})

app.post('/order/validate', async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body

  const sha = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)

  sha.update(`${razorpayOrderId}|${razorpayPaymentId}`)
  const digest = sha.digest('hex')
  if (digest !== razorpaySignature) {
    return res.status(400).json({ msg: 'Transaction is not legit!' })
  }

  res.json({
    msg: 'success',
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId
  })
})
app.use(`/${process.env.API_PREFIX}/${process.env.VERSION_V1}`, routes)

module.exports = app
