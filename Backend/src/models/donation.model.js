const { DataTypes } = require('sequelize')
const db = require('../config/sequelize')

const Donation = db.define('Donation', {
  DonationID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: {
    type: DataTypes.INTEGER
  },
  CampaignID: {
    type: DataTypes.INTEGER
  },
  Amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  DonationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
})

module.exports = Donation
