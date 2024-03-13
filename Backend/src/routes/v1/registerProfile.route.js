const express = require('express')
const { registerProfileController } = require('../../controllers')

//= ===============================
// Register routes
//= ===============================

const router = express.Router()

router.post('/register', registerProfileController.register)

module.exports = router
