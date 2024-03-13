const { DataTypes } = require('sequelize')
const db = require('../config/sequelize.js')

const Donation = db.define(
  'Donation',
  {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    campaignID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    donationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false,
    tableName: 'Donations'
  }
)

module.exports = Donation
