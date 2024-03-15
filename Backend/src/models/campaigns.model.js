const { DataTypes } = require('sequelize')
const db = require('../config/sequelize')

const Campaign = db.define('Campaign', {
  CampaignID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserID: {
    type: DataTypes.INTEGER
  },
  CampaignName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Description: {
    type: DataTypes.TEXT
  },
  TargetAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  CurrentAmount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  CampaignStartDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  CampaignEndDate: {
    type: DataTypes.DATE
  }
})

module.exports = Campaign
