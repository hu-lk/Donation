const Campaign = require('../models/campaigns.model')

// Create a new campaign
const createCampaign = async (req, res) => {
  try {
    const { name, description, targetAmount, campaignEndDate } = req.body

    const newCampaign = await Campaign.create({
      name,
      description,
      targetAmount,
      campaignEndDate
    })

    res.status(201).json({ success: true, campaign: newCampaign })
  } catch (error) {
    console.error('Error creating campaign:', error)
    res.status(500).json({ success: false, error: 'Unable to create campaign' })
  }
}

// Get all campaigns
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll()
    res.status(200).json({ success: true, campaigns })
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    res.status(500).json({ success: false, error: 'Unable to fetch campaigns' })
  }
}

module.exports = { createCampaign, getAllCampaigns }
