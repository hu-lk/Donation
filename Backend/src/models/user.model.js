const { DataTypes } = require('sequelize')
const db = require('../config/sequelize')

const User = db.define('User', {
  UserID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  RegistrationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
})

module.exports = User
