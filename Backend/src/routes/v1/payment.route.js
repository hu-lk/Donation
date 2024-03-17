const express = require('express')
const paymentController = require('../../controllers/paymentController')

//= ===============================
// payment routes
//= ===============================

const router = express.Router()

router.post('/order', paymentController.generateOrder)

router.post('/order/validate', paymentController.validatePayment)

module.exports = router
