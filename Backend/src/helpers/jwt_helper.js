const moment = require('moment')
const jwt = require('jsonwebtoken')
const AuthToken = require('../domainEntities/authTokenEntity.js')
const { tokenTypes } = require('../config/tokenTypes.js')

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */

const generateToken = (
  userId,
  expires,
  type,
  secret = process.env.JWT_SECRET
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(), // issued at what time
    exp: expires.unix(),
    type
  }
  const created = jwt.sign(payload, secret)
  return created
}

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {moment} expiresAt
 * @param {string} tokenType
 * @returns {Promise<Token>}
 */

const saveToken = async (token, userId, expires, tokenType) => {
  const tokenDoc = await AuthToken.create({
    tokenValue: token,
    profileId: userId,
    expiresAt: expires.toDate(),
    issuedAt: new Date(),
    tokenType
  })
  return tokenDoc
}

const generateVerifyEmailToken = async (user) => {
  const verifyEmailTokenExpires = moment().add(
    process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    'minutes'
  )

  const verifyEmailToken = generateToken(
    user.profileId,
    verifyEmailTokenExpires,
    tokenTypes.VERIFY_EMAIL
  )

  await saveToken(
    verifyEmailToken,
    user.profileId,
    verifyEmailTokenExpires,
    tokenTypes.VERIFY_EMAIL
  )

  return verifyEmailToken
}

const generateForgotPasswordToken = async (user) => {
  const forgotPasswordTokenExpires = moment().add(
    process.env.JWT_FORGOT_PASSWORD_EXPIRATION_MINUTES,
    'minutes'
  )
  const forgotPasswordToken = generateToken(
    user.profileId,
    forgotPasswordTokenExpires,
    tokenTypes.FORGOT_PASSWORD
  )
  await saveToken(
    forgotPasswordToken,
    user.profileId,
    forgotPasswordTokenExpires,
    tokenTypes.FORGOT_PASSWORD
  )
  return forgotPasswordToken
}

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    'minutes'
  )
  const accessToken = generateToken(
    user.profileId,
    accessTokenExpires,
    tokenTypes.ACCESS
  )

  const refreshTokenExpires = moment().add(
    process.env.JWT_REFRESH_EXPIRATION_DAYS,
    'days'
  )
  const refreshToken = generateToken(
    user.profileId,
    refreshTokenExpires,
    tokenTypes.REFRESH
  )
  await saveToken(
    refreshToken,
    user.profileId,
    refreshTokenExpires,
    tokenTypes.REFRESH
  )
  await saveToken(
    accessToken,
    user.profileId,
    accessTokenExpires,
    tokenTypes.ACCESS
  )

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  }
}

module.exports = {
  generateAuthTokens,
  generateForgotPasswordToken,
  generateVerifyEmailToken
}
