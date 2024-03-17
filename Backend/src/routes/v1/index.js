const express = require('express')
const registerProfileRoute = require('./registerProfile.route')
const campaignRoute = require('./campaign.route')
const authRoute = require('./auth.route')
const paymentRoute = require('./payment.route')

const router = express.Router()

const defaultRoutes = [
  {
    path: '',
    route: registerProfileRoute
  },
  {
    path: '',
    route: authRoute
  },
  {
    path: '',
    route: campaignRoute
  },
  {
    path: '',
    route: paymentRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

module.exports = router
