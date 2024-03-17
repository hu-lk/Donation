const Campaign = require('../models/campaigns.model')
const Donation = require('../models/donation.model')
const Razorpay = require('razorpay')
const crypto = require('crypto')

// Initialize Razorpay client with your Razorpay key ID and secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
})

// Function to generate an order with Razorpay
const generateOrder = async (req, res) => {
  try {
    const { CampaignID, Amount } = req.body

    // Step 1: Get campaign details
    const campaign = await Campaign.findByPk(CampaignID)
    if (!campaign) {
      return res
        .status(404)
        .json({ success: false, error: 'Campaign not found' })
    }

    // Step 2: Generate order with Razorpay
    const orderOptions = {
      amount: Amount * 100, // Convert to smallest currency unit (e.g., paisa for INR)
      currency: 'INR', // Currency code (e.g., INR for Indian Rupees)
      receipt: `campaign_${Date.now()}`, // Unique receipt identifier for the campaign
      payment_capture: 1 // Capture payment immediately (1 for true)
    }
    const order = await razorpay.orders.create(orderOptions)

    res.json(order)
  } catch (error) {
    console.error('Error generating order:', error)
    res.status(500).json({ success: false, error: 'Error generating order' })
  }
}

// Function to validate payment and update database
const processDonation = async (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      CampaignID,
      UserID,
      Amount
    } = req.body

    // Step 1: Validate payment signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(razorpayOrderId + '|' + razorpayPaymentId)
      .digest('hex')

    if (generatedSignature !== razorpaySignature) {
      return res
        .status(400)
        .json({ success: false, error: 'Payment verification failed' })
    }

    // Step 2: Update database with donation details
    const newDonation = await Donation.create({
      UserID,
      CampaignID,
      Amount,
      DonationDate: new Date()
    })

    // Step 3: Update campaign's current amount
    const campaign = await Campaign.findByPk(CampaignID)
    const updatedAmount = campaign.CurrentAmount + Amount
    await campaign.update({ CurrentAmount: updatedAmount })

    res.json({ success: true, donation: newDonation })
  } catch (error) {
    console.error('Error processing donation:', error)
    res.status(500).json({ success: false, error: 'Error processing donation' })
  }
}

module.exports = { generateOrder, processDonation }
