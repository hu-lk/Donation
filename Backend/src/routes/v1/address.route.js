const express = require('express')
const { addressController } = require('../../controllers')

//= ===============================
// Address routes
//= ===============================

const router = express.Router()

router.get('/profile/address/countries', addressController.countries)

router.get('/profile/address/:countryId/states', addressController.states)

router.get('/profile/address/:stateId/cities', addressController.cities)

module.exports = router
