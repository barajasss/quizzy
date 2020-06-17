const mongoose = require('mongoose')
const User = require('../models/userModel')
const Quiz = require('../models/quizModel')
const Important = require('../models/importantModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getHomePage = catchAsync(async (req, res, next) => {
	let page = Number(req.query.page || 1)
	let limit = 5

	let quizzesQuery = Quiz.find().populate('author', 'username')
	let totalPages = Math.ceil((await Quiz.find().countDocuments()) / limit)

	// paginate
	quizzesQuery.skip((page - 1) * limit).limit(limit)

	let quizzes = await quizzesQuery
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
		pageErr: page > totalPages || page < 0,
		nextPage: {
			next: page < totalPages,
			num: page + 1,
		},
		prevPage: {
			prev: page > 1,
			num: page - 1,
		},
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

exports.getAdmin = catchAsync(async (req, res, next) => {
	const users = await User.find({ role: 'user' })
		.populate('quizzesCreated')
		.populate('quizzesTaken')
		.populate('quizzesImportant')

	let quizzes = await Quiz.find().populate('author')
	quizzes = quizzes.filter(quiz => quiz.author.role !== 'admin')

	// get some stats and append it to the quiz document.
	quizzes = await Promise.all(
		quizzes.map(async quiz => {
			quiz.totalTaken = await quiz.totalTaken()
			quiz.totalImportant = await quiz.totalImportant()
			quiz.totalReview = await quiz.totalReview()
			return quiz
		})
	)
	res.render('admin', {
		users,
	})
})
