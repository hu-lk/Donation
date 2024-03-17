const logger = require('../utilities/logger')
const User = require('../models/user.model')
const jwt_helper = require('../helpers/jwt_helper')
const bcrypt = require('bcrypt')

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      logger.info(
        `"authController.js","login()","User with email: ${email} not found.!!!"`
      )
      return res.status(404).json({
        message: `User with email: ${email} not found.!!!`
      })
    }

    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch) {
      logger.info(
        `"authController.js","login()","Invalid password for user with email: ${email}.!!!"`
      )
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    const tokens = await jwt_helper.generateAuthTokens(user)

    res.status(200).json(tokens)
  } catch (error) {
    logger.error(
      `"authController.js","login()","Error during login: ${error.message}"`
    )
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  login
}
