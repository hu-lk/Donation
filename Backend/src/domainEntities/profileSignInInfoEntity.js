const { DataTypes } = require('sequelize')
const db = require('../config/sequelize.js')

const ProfileSignInInfo = db.define(
  'mcc_profile_signin_info',
  {
    profileId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    profilePassword: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    passwordResetRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAtTimestampUtc: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastModifiedTimestampUtc: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'mcc_profile_signin_info'
  }
)

module.exports = ProfileSignInInfo
