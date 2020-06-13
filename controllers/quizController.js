const Quiz = require('../models/quizModel')

exports.getAddQuiz = async (req, res, next) => {
	res.render('quiz/addQuiz')
}

exports.postAddQuiz = async (req, res, next) => {
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
}

exports.getQuiz = async (req, res, next) => {
	const quiz = await Quiz.findById(req.params.quizId)
	res.render('quiz/quizInfo', {
		quiz,
	})
}

exports.getQuizMain = async (req, res, next) => {
	const quiz = await Quiz.findById(req.params.quizId)
	res.render('quiz/quizMain', {
		quiz,
	})
}

exports.postQuizMain = async (req, res, next) => {
	const quiz = await Quiz.findById(req.params.quizId)
	let points = 0
	let totalPoints = quiz.questions.length

	quiz.questions.forEach(({ answer }, i) => {
		if (answer === req.body.answers[i]) {
			points++
		}
	})
	// res.locals.quiz = quiz
	// res.locals.points = points
	// res.locals.totalPoints = totalPoints

	req.app.locals = {
		quiz,
		points,
		totalPoints,
	}
	console.log(req.app.locals)
	res.redirect(`/quizzes/score`)
}

exports.getScore = async (req, res, next) => {
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
}
