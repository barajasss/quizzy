const mongoose = require('mongoose')
const User = require('../models/userModel')
const Quiz = require('../models/quizModel')
const Important = require('../models/importantModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getHomePage = catchAsync(async (req, res, next) => {
	let quizzes = await Quiz.find().populate('author', 'username')
	if (req.user) {
		quizzes = await Promise.all(
			quizzes.map(async quiz => {
				quiz = await Quiz.includeImportant(quiz, req.user.id)
				return quiz
			})
		)
	}
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

exports.getAccount = catchAsync(async (req, res, next) => {
	const quizzesImportant = await Important.find({
		user: req.user.id,
	}).populate('quiz')
	req.user.quizzesImportant = quizzesImportant
	res.render('./user/account')
})

exports.getProfile = catchAsync(async (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
		return next(
			new AppError(
				'The profile belonging to this user Id does not exist.',
				400,
				'Invalid Profile ID'
			)
		)
	}
	const user = await User.findById(req.params.userId).populate(
		'quizzesCreated',
		'title'
	)
	res.render('user/profile', {
		user,
	})
})

exports.getAbout = (req, res, next) => {
	res.render('about')
}
