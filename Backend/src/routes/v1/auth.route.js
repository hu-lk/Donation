const express = require('express')
const { authController } = require('../../controllers')
const { profileManagementValidation } = require('../../validations')

//= ===============================
// Auth routes
//= ===============================

const router = express.Router()

router.post('/profile/login', authController.login)

router.post('/profile/forgotPassword', authController.forgotPassword)

router.post(
  '/profile/forgotChangePassword/:token',
  profileManagementValidation.forgotChangeValidation,
  authController.forgotChangePassword
)

module.exports = router
