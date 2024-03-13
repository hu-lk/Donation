const { DataTypes } = require('sequelize')
const db = require('../config/sequelize.js')

const Campaign = db.define(
  'Campaign',
  {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    campaignName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    targetAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currentAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    campaignStartDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    campaignEndDate: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false,
    tableName: 'Campaigns'
  }
)

module.exports = Campaign
