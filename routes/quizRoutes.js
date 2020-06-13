const express = require('express')
const router = express.Router()

const quizController = require('../controllers/quizController')

router
	.route('/add')
	.get(quizController.getAddQuiz)
	.post(quizController.postAddQuiz)

router.get('/score', quizController.getScore)

router.route('/:quizId').get(quizController.getQuiz)
router
	.route('/takequiz/:quizId')
	.get(quizController.getQuizMain)
	.post(quizController.postQuizMain)

module.exports = router
