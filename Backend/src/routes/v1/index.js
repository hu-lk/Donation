const express = require('express')
const registerProfileRoute = require('./registerProfile.route')
const addressRoute = require('./address.route')
const authRoute = require('./auth.route')
const profileRoute = require('./profile.route')

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
    route: addressRoute
  },
  {
    path: '',
    route: profileRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

module.exports = router
