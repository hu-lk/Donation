const logger = require('../utilities/logger')
const Country = require('../domainEntities/countriesEntity')
const State = require('../domainEntities/statesEntity')
const City = require('../domainEntities/citiesEntity')

// Countries endpoint
const countries = async (req, res) => {
  try {
    const countriesData = await Country.findAll({
      attributes: ['id', 'countryName']
    })
    res.status(200).json(countriesData)
  } catch (error) {
    logger.error(`"addressController.js","countries()","${error.message}"`)
    res.status(500).json({ error: error.message })
  }
}

// States endpoint
const states = async (req, res) => {
  const { countryId } = req.params
  try {
    const statesData = await State.findAll({
      attributes: ['id', 'stateName'],
      where: { countryId: countryId }
    })
    res.status(200).json(statesData)
  } catch (error) {
    logger.error(`"addressController.js","states()","${error.message}"`)
    res.status(500).json({ error: error.message })
  }
}

// Cities endpoint
const cities = async (req, res) => {
  const { stateId } = req.params
  try {
    const citiesData = await City.findAll({
      attributes: ['id', 'cityName'],
      where: { stateId: stateId }
    })
    res.status(200).json(citiesData)
  } catch (error) {
    logger.error(`"addressController.js","cities()","${error.message}"`)
    res.status(500).json({ error: error.message })
  }
}

module.exports = { countries, states, cities }
