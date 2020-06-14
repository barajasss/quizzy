const express = require('express')
const router = express.Router()

// controllers
const mainController = require('../controllers/mainController')
const authController = require('../controllers/authController')

router.use(authController.isLoggedIn)

router.get('/', authController.isLoggedIn, mainController.getHomePage)

router.get('/login', mainController.getLogin)
router.get('/signup', mainController.getSignup)

module.exports = router
