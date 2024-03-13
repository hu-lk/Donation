const { DataTypes } = require('sequelize')
const db = require('../config/sequelize.js')

const User = db.define(
  'User',
  {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    registrationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false,
    tableName: 'Users'
  }
)

module.exports = User
