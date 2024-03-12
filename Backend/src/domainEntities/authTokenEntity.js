const { DataTypes } = require('sequelize')
const db = require('../config/sequelize.js')
const { tokenTypes } = require('../config/tokenTypes.js')

const AuthToken = db.define(
  'mcc_auth_tokens',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tokenValue: {
      type: DataTypes.STRING(10000),
      allowNull: false
    },
    tokenType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      enum: [
        tokenTypes.ACCESS,
        tokenTypes.REFRESH,
        tokenTypes.RESET_PASSWORD,
        tokenTypes.VERIFY_EMAIL,
        tokenTypes.FORGOT_PASSWORD
      ]
    },
    issuedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

module.exports = AuthToken
