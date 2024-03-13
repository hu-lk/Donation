const moment = require('moment')
const jwt = require('jsonwebtoken')
const Token = require('../models/token.model.js')
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
  const tokenDoc = await Token.create({
    tokenValue: token,
    profileId: userId,
    expiresAt: expires.toDate(),
    issuedAt: new Date(),
    tokenType
  })
  return tokenDoc
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
  generateAuthTokens
}
