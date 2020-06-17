const express = require('express')
const router = express.Router()

// controllers
const mainController = require('../controllers/mainController')
const authController = require('../controllers/authController')

router.use(authController.isLoggedIn)

router.get('/', mainController.getHomePage)

router.get('/login', mainController.getLogin)
router.get('/signup', mainController.getSignup)
router.get('/account', authController.protect, mainController.getAccount)
router.get('/about', mainController.getAbout)
router.get('/profile/:userId', mainController.getProfile)

router.get(
	'/admin',
	authController.protect,
	authController.restrictTo('admin'),
	mainController.getAdmin
)

module.exports = router
