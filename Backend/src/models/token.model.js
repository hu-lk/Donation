// models/Token.js
const { DataTypes } = require('sequelize')
const db = require('../config/database')

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
    type: DataTypes.ENUM('access', 'refresh'),
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
