const Quiz = require('../models/quizModel')
const catchAsync = require('../utils/catchAsync')

exports.getAddQuiz = catchAsync(async (req, res, next) => {
	res.render('quiz/addQuiz')
})

exports.postAddQuiz = catchAsync(async (req, res, next) => {
	console.log(req.body)
	let questions = []
	for (let i = 0; i < req.body.questions.length; i++) {
		questions.push({
			question: req.body.questions[i],
			options: [
				req.body.options[i][0],
				req.body.options[i][1],
				req.body.options[i][2],
				req.body.options[i][3],
			],
			answer: req.body.answers[i],
		})
	}
	await Quiz.create({
		title: req.body.title,
		description: req.body.description,
		difficulty: req.body.difficulty,
		questions,
	})
	res.redirect('/')
})

exports.getQuiz = catchAsync(async (req, res, next) => {
	const quiz = await Quiz.findById(req.params.quizId)
	res.render('quiz/quizInfo', {
		quiz,
	})
})

exports.getQuizMain = catchAsync(async (req, res, next) => {
	const quiz = await Quiz.findById(req.params.quizId)
	res.render('quiz/quizMain', {
		quiz,
	})
})

exports.postQuizMain = catchAsync(async (req, res, next) => {
	const quiz = await Quiz.findById(req.params.quizId)
	let points = 0
	let totalPoints = quiz.questions.length

	quiz.questions.forEach(({ answer }, i) => {
		if (answer === req.body.answers[i]) {
			points++
		}
	})

	req.app.locals = {
		quiz,
		points,
		totalPoints,
	}
	console.log(req.app.locals)
	res.redirect(`/quizzes/score`)
})

exports.getScore = catchAsync(async (req, res, next) => {
	if (
		req.app.locals.quiz !== undefined &&
		req.app.locals.points !== undefined &&
		req.app.locals.totalPoints !== undefined
	) {
		res.render('quiz/quizScore')
		req.app.locals = {}
	} else {
		res.redirect('/')
	}
})
