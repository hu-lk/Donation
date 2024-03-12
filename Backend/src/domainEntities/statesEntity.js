const { DataTypes } = require('sequelize')
const db = require('../config/sequelize.js')

const State = db.define(
  'State',
  {
    stateName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    countryId: {
      type: DataTypes.MEDIUMINT,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'states'
  }
)

module.exports = State
