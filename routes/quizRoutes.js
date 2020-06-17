const express = require('express')
const router = express.Router()

const quizController = require('../controllers/quizController')
const authController = require('../controllers/authController')

router.use(authController.isLoggedIn)

router
	.route('/add')
	.get(authController.protect, quizController.getAddQuiz)
	.post(authController.protect, quizController.postAddQuiz)

router.get('/score', quizController.getScore)
router.route('/:quizId').get(quizController.getQuiz)

router
	.route('/takequiz/:quizId')
	.get(quizController.getQuizMain)
	.post(quizController.postQuizMain)

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

router.post(
	'/delete/:quizId',
	authController.protect,
	quizController.deleteQuiz
)

module.exports = router
