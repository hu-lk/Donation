const { DataTypes } = require('sequelize')
const db = require('../config/sequelize.js')
const { tokenTypes } = require('../config/tokenTypes')

const Token = db.define(
  'Token',
  {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tokenType: {
      type: DataTypes.ENUM('access', 'refresh'),
      allowNull: false,
      defaultValue: tokenTypes.ACCESS // Set default value to 'access'
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    expiryDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'Tokens'
  }
)

module.exports = Token
