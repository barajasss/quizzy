const express = require('express')
const router = express.Router()

const quizController = require('../controllers/quizController')
const authController = require('../controllers/authController')

router.use(authController.isLoggedIn)

router
	.route('/add')
	.get(authController.protect, quizController.getAddQuiz)
	.post(authController.protect, quizController.postAddQuiz)

router.get('/score', authController.protect, quizController.getScore)
router.route('/:quizId').get(quizController.getQuiz)

router
	.route('/takequiz/:quizId')
	.get(authController.protect, quizController.getQuizMain)
	.post(authController.protect, quizController.postQuizMain)

router
	.post(
		'/important/add/:quizId',
		authController.protect,
		quizController.markImportant
	)
	.post(
		'/important/remove/:quizId',
		authController.protect,
		quizController.markUnimportant
	)

module.exports = router
