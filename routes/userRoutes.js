const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/login').post(userController.login).get(userController.getLogin)

router
	.route('/signup')
	.post(userController.signup)
	.get(userController.getSignup)

router.route('/logout').post(userController.logout).get(userController.getLogin)

module.exports = router
