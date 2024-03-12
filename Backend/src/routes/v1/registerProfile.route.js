const express = require('express')
const { registerProfileController } = require('../../controllers')
const { profileManagementValidation } = require('../../validations')

//= ===============================
// Register routes
//= ===============================

const router = express.Router()

router.post(
  '/profile/register',
  // profileManagementValidation.registerValidation,
  registerProfileController.register
)

router.put('/profile/verifyEmail/:token', registerProfileController.verifyEmail)

router.post(
  '/profile/regenerateVerifyEmail/:token',
  registerProfileController.regenerateVerifyEmail
)

module.exports = router
