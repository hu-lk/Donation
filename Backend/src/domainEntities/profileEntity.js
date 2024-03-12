const { DataTypes } = require('sequelize')
const db = require('../config/sequelize.js')

const Profile = db.define(
  'mcc_profiles',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true // Ensures profileId is unique
    },
    profileType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[1, 2]] // Ensures value is either 1 (Individual) or 2 (Corporate)
      }
    },
    emailAddress: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isEmailAddressVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    mobileNumber: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    isMobileNumberVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    phoneNumber: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isProfileComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    profileLogoLocation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    kycStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[0, 1, 2, 3, 4]]
      },
      defaultValue: 0
    },
    createdAtTimestampUtc: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastModifiedTimestampUtc: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastModifiedUserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

module.exports = Profile
