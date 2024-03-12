const { DataTypes } = require('sequelize')
const db = require('../config/sequelize.js')

const City = db.define(
  'City',
  {
    cityName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    stateId: {
      type: DataTypes.MEDIUMINT,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'cities'
  }
)

module.exports = City
