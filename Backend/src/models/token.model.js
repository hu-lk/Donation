const { DataTypes } = require('sequelize')
const db = require('../config/sequelize')

const Token = db.define('Token', {
  TokenID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: {
    type: DataTypes.INTEGER
  },
  TokenType: {
    type: DataTypes.ENUM('ACCESS', 'REFRESH'),
    allowNull: false
  },
  Token: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  ExpiryDateTime: {
    type: DataTypes.DATE,
    allowNull: false
  }
})

module.exports = Token
