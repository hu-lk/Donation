const { profileManagementService } = require('../services')
const logger = require('../utilities/logger')
const emailService = require('../utilities/emailService')
const Hasher = require('../utilities/hasher')
const { tokenTypes } = require('../config/tokenTypes')
const jwt_helper = require('../helpers/jwt_helper')
const Profile = require('../domainEntities/profileEntity')
const AuthToken = require('../domainEntities/authTokenEntity')
const ProfileSignInInfo = require('../domainEntities/profileSignInInfoEntity')

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await profileManagementService.loginUserWithEmailAndPassword(
      email,
      password
    )

    // Check if the user's email is verified
    if (!user.isEmailAddressVerified) {
      // Return status code 400 for Bad Request
      return res
        .status(400)
        .json({ message: 'Email not verified. Please verify your email.' })
    }

    if (user === false) {
      // Return status code 401 for Unauthorized
      return res.status(401).json({ message: 'Incorrect email or password' })
    }

    const tokens = await jwt_helper.generateAuthTokens(user)

    // Send the access token in the response header
    res.set('X-Access-Token', tokens.access.token)

    return res.status(200).json({ message: 'Login successful' })
  } catch (error) {
    logger.error(
      `"registerProfileController.js","login()","Unable to login: ${error.message}"`
    )
    res.status(500).json({ error: 'Unable to login' })
  }
}

// Forgot Password
const forgotPassword = async (req, res) => {
  const { emailAddress } = req.body

  try {
    const user = await Profile.findOne({
      where: { emailAddress: emailAddress }
    })

    if (!user) {
      logger.error(
        `"registerProfileController.js","forgotPassword()","User with email: ${emailAddress} doesn't exist"`
      )
      return res
        .status(200)
        .json({ message: 'Email will be sent to the registered email id' })
    }

    const token = await jwt_helper.generateForgotPasswordToken(user)
    // console.log('this is token in controller        ' + token)

    await emailService.sendForgotPasswordEmail(emailAddress, token)

    res
      .status(200)
      .json({ message: 'Email will be sent to the registered email id' })
  } catch (error) {
    logger.error(
      `"registerProfileController.js","forgotPassword()","${error.message}"`
    )
    res.status(500).json({ error })
  }
}

// Forgot Change Password
const forgotChangePassword = async (req, res) => {
  const { token } = req.params
  const { newPassword } = req.body

  try {
    const userFromToken = await AuthToken.findOne({
      where: { tokenValue: token, tokenType: tokenTypes.FORGOT_PASSWORD }
    })

    if (!userFromToken) {
      logger.info(
        '"registerProfileController.js","forgotChangePassword()","Invalid or expired token"'
      )
      // Return status code 498 for Invalid Token
      return res.status(498).json({
        message: `Invalid or expired token`
      })
    }

    const userId = userFromToken.profileId
    const user = await ProfileSignInInfo.findOne({
      where: { profileId: userId }
    })

    if (!user) {
      logger.info(
        `"registerProfileController.js","forgotChangePassword()","Could not find the user with the userId: ${userId} "`
      )
      return res.status(404).json({
        message: `Could not find the user with the ${userId}`
      })
    }

    const hashedPassword = await Hasher.generateHash(newPassword)

    user.profilePassword = hashedPassword
    await user.save()

    // Remove the token from the database after successful verification
    await AuthToken.destroy({ where: { tokenValue: token } })

    logger.info(
      '"registerProfileController.js","forgotChangePassword()","Password changed successful"'
    )
    res.status(201).send('Password has been successfully reset')
  } catch (error) {
    logger.error(
      `"registerProfileController.js","forgotChangePassword()","${error.message}"`
    )
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  login,
  forgotPassword,
  forgotChangePassword
}
