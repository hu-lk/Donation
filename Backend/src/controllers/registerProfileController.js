const { profileManagementService } = require('../services')
const logger = require('../utilities/logger')
const jwt_helper = require('../helpers/jwt_helper')
const { tokenTypes } = require('../config/tokenTypes')
const Profile = require('../domainEntities/profileEntity')
const AuthToken = require('../domainEntities/authTokenEntity')

// Register
const register = async (req, res) => {
  try {
    const { emailAddress } = req.body
    const existingUser = await Profile.findOne({ where: { emailAddress } })
    if (existingUser) {
      logger.info(
        `"registerProfileController.js","register()","User with email: ${emailAddress} already exists.!!!"`
      )
      // Return status code 409 for Conflict
      return res.status(409).json({
        message: `User with email: ${emailAddress} already exists.!!!`
      })
    }

    await profileManagementService.createProfile(req.body)

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    logger.error(
      `"registerProfileController.js","register()","Unable to create a user: ${error.message}"`
    )

    res.status(500).json({ error: 'Unable to create a user' })
  }
}

//Verify email
const verifyEmail = async (req, res) => {
  const { token } = req.params

  try {
    const userFromToken = await AuthToken.findOne({
      where: { tokenValue: token, tokenType: tokenTypes.VERIFY_EMAIL }
    })

    if (!userFromToken) {
      logger.info(
        '"registerProfileController.js","verifyEmail()","Token expired"'
      )
      // Return status code 498 for Invalid Token
      return res.status(498).json({
        message: `Token expired`
      })
    }

    const userId = userFromToken.profileId
    const user = await Profile.findOne({ where: { profileId: userId } })

    if (!user) {
      logger.info(
        `"registerProfileController.js","verifyEmail()","Could not find the user with the ${userId} "`
      )
      // Return status code 404 for Not Found
      return res.status(404).json({
        message: `Could not find the user`
      })
    }

    user.isEmailAddressVerified = true
    await user.save()

    // Remove the token from the database after successful verification
    await AuthToken.destroy({ where: { tokenValue: token } })

    logger.info(
      '"registerProfileController.js","verifyEmail()","User email verified successfully"'
    )
    res.status(200).json({ message: 'User email verified successfully' })
  } catch (error) {
    logger.error(
      `"registerProfileController.js","verifyEmail()","Unable to verify the email: ${error.message}"`
    )

    res.status(500).json({ error: 'Unable to verify the email' })
  }
}

const regenerateVerifyEmail = async (req, res) => {
  const { token } = req.params

  try {
    const userFromToken = await AuthToken.findOne({
      where: { tokenValue: token, tokenType: tokenTypes.VERIFY_EMAIL }
    })

    const userId = userFromToken.profileId
    const user = await Profile.findOne({ where: { profileId: userId } })

    if (!user) {
      logger.info(
        `"registerProfileController.js","regenerateVerifyEmail()","Could not find the user with the ID ${userId}"`
      )
      // Return status code 404 for Not Found
      return res.status(404).json({
        message: `Could not find the user`
      })
    }

    const verifyEmailToken = await jwt_helper.generateVerifyEmailToken(user)

    // await emailService.sendRegistrationVerificationEmail(
    //   user.emailAddress,
    //   verifyEmailToken,
    //   firstName,
    //   lastName
    // )

    logger.info(
      `"registerProfileController.js","regenerateVerifyEmail()","Verification email resent successfully for user"`
    )
    res.status(200).json({
      message: 'Verification email resent successfully',
      verifyEmailToken
    })
  } catch (error) {
    logger.error(
      `"registerProfileController.js","regenerateVerifyEmail()","Unable to resend verification email: ${error.message}"`
    )

    res.status(500).json({ error: 'Unable to resend verification email' })
  }
}

module.exports = {
  register,
  verifyEmail,
  regenerateVerifyEmail
}
