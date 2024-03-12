const { DataTypes } = require('sequelize')
const db = require('../config/sequelize.js')

const Country = db.define(
  'Country',
  {
    countryName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: 'countries',
    timestamps: false
  }
)

module.exports = Country
