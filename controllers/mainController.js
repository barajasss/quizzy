const Quiz = require('../models/quizModel')
const catchAsync = require('../utils/catchAsync')

exports.getHomePage = catchAsync(async (req, res, next) => {
	const quizzes = await Quiz.find()
	res.render('index', {
		quizzes: quizzes,
	})
})

exports.getLogin = (req, res, next) => {
	res.render('./auth/login')
	req.app.locals.err = undefined
}

exports.getSignup = (req, res, next) => {
	res.render('./auth/signup')
	req.app.locals.err = undefined
}
