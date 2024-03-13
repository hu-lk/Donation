const express = require('express')
const { authController } = require('../../controllers')

//= ===============================
// Auth routes
//= ===============================

const router = express.Router()

router.post('/login', authController.login)

module.exports = router
