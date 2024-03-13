const express = require('express')
const campaignController = require('../../controllers/campaignController')

//= ===============================
// Campaign routes
//= ===============================

const router = express.Router()

router.post('/campaigns', campaignController.createCampaign)

router.get('/campaigns', campaignController.getAllCampaigns)

module.exports = router
