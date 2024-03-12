require('dotenv').config()
const db = require('../config/sequelize.js')
const bcrypt = require('bcrypt')
const jwt_helper = require('../helpers/jwt_helper')
const logger = require('../utilities/logger')
const Hasher = require('../utilities/hasher')
const emailService = require('../utilities/emailService.js')
const Profile = require('../domainEntities/profileEntity')
const ProfileSignInInfo = require('../domainEntities/profileSignInInfoEntity')

const createProfile = async (signUpData) => {
  let transaction = null
  try {
    const { profileType, emailAddress, password, firstName, lastName } =
      signUpData

    const hashedPassword = await Hasher.generateHash(password)

    // Find the highest profileId
    const lastProfile = await Profile.findOne({
      order: [['profileId', 'DESC']]
    })

    const nextProfileId = lastProfile ? lastProfile.profileId + 1 : 1001
    // Start a transaction
    transaction = await db.transaction()

    const newUser = await Profile.create(
      {
        profileId: nextProfileId,
        profileType: profileType,
        emailAddress: emailAddress,
        createdAtTimestampUtc: new Date(),
        lastModifiedTimestampUtc: new Date(),
        lastModifiedUserId: 0
      },
      { transaction }
    )

    await ProfileSignInInfo.create(
      {
        profileId: newUser.profileId,
        profilePassword: hashedPassword,
        createdAtTimestampUtc: new Date(),
        lastModifiedTimestampUtc: new Date()
      },
      { transaction }
    )
    // Commit the transaction if everything is successful
    await transaction.commit()

    const verifyEmailToken = await jwt_helper.generateVerifyEmailToken(newUser)

    await emailService.sendRegistrationVerificationEmail(
      emailAddress,
      verifyEmailToken,
      firstName,
      lastName
    )

    logger.info(
      `"profileManagementService.js","createUser()","New user created "`
    )
  } catch (error) {
    logger.error(
      `"profileManagementService.js","createUser()","${error.message}"`
    )
    // Rollback the transaction if an error occurs
    await transaction.rollback()
    throw error
  }
}

const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await Profile.findOne({
      where: { emailAddress: email }
    })

    const userSignIn = await ProfileSignInInfo.findOne({
      where: { profileId: user.profileId }
    })

    if (!user || !bcrypt.compareSync(password, userSignIn.profilePassword)) {
      logger.error(
        '"profileManagementService.js","loginUserWithEmailAndPassword()","Incorrect email or password"'
      )
      return false
    }
    return user
  } catch (error) {
    logger.error(
      `"profileManagementService.js","loginUserWithEmailAndPassword()","${error.message}"`
    )
    throw error
  }
}

module.exports = {
  createProfile,
  loginUserWithEmailAndPassword
}
