const logger = require('../utilities/logger')
const User = require('../models/user.model')
const { generateHash } = require('../utilities/hasher')

// Register
const register = async (req, res) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      logger.info(
        `"registerProfileController.js","register()","User with email: ${email} already exists.!!!"`
      )
      return res.status(409).json({
        message: `User with email: ${email} already exists.!!!`
      })
    }

    const hashedPassword = await generateHash(password)

    await User.create({ email, password: hashedPassword })

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    logger.error(
      `"registerProfileController.js","register()","Unable to create a user: ${error.message}"`
    )
    res.status(500).json({ error: 'Unable to create a user' })
  }
}

module.exports = {
  register
}
