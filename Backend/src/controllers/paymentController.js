const Campaign = require('../models/campaigns.model')
const crypto = require('crypto') // Import crypto module for generating SHA
const Razorpay = require('razorpay') // Import Razorpay module

const generateOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET
    })

    const options = req.body
    const order = await razorpay.orders.create(options)

    if (!order) {
      console.error('Failed to create order:', options)
      return res.status(500).send('Error creating order')
    }

    console.log('Order created:', order)
    res.json(order)
  } catch (err) {
    console.error('Error generating order:', err)
    res.status(500).send('Error generating order')
  }
}

const validatePayment = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body

  const sha = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)

  sha.update(`${razorpayOrderId}|${razorpayPaymentId}`)
  const digest = sha.digest('hex')
  if (digest !== razorpaySignature) {
    console.error('Payment validation failed:', req.body)
    return res.status(400).json({ msg: 'Transaction is not legit!' })
  }

  console.log('Payment validated successfully:', req.body)
  res.json({
    msg: 'success',
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId
  })
}

module.exports = { generateOrder, validatePayment }
