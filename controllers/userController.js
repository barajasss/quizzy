const Quiz = require('../models/quizModel')
const Review = require('../models/reviewModel')
const Important = require('../models/importantModel')
const Taken = require('../models/takenModel')
const User = require('../models/userModel')

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

const createCookie = (user, res, id) => {
	let token = user.createToken(id)
	res.cookie('jwt', token, {
		maxAge: 30 * 24 * 60 * 60 * 1000,
		httpOnly: true,
	})
}

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body
	if (!email || !password) {
		return next(
			new AppError(
				'Email and password fields are required',
				400,
				process.env.LOGIN_ERROR
			)
		)
	}
	const user = await User.findOne({ email })

	if (!user || !(await user.correctPassword(password))) {
		return next(
			new AppError(
				'Email or password is wrong',
				401,
				process.env.LOGIN_ERROR
			)
		)
	}

	createCookie(user, res, user.id)
	res.redirect('/')
})

exports.signup = catchAsync(async (req, res, next) => {
	const { username, email, password, passwordConfirm } = req.body
	if (username && email && password && passwordConfirm) {
		const user = await User.create({
			username,
			email,
			password,
			passwordConfirm,
		})
		if (user) {
			// sign user in by creating a new jwt
			createCookie(user, res, user.id)
		}
	}
	res.redirect('/')
})

exports.logout = (req, res, next) => {
	res.cookie('jwt', 'loggedout', {
		expires: new Date(Date.now() - 1000000),
		httpOnly: true,
	})
	res.redirect('/')
}

exports.getLogin = (req, res, next) => {
	res.redirect('/login')
}

exports.getSignup = (req, res, next) => {
	res.redirect('/signup')
}

exports.deleteUser = catchAsync(async (req, res, next) => {
	// remove user the related data in other collections

	await Review.deleteMany({ user: req.user.id })
	await Taken.deleteMany({ user: req.user.id })
	await Important.deleteMany({ user: req.user.id })

	// get the quizzes by this user

	const quizzes = await Quiz.find({ author: req.user.id })

	// remove the data where other people have used the quizzes by this user

	await Promise.all(
		quizzes.map(async quiz => {
			await Important.deleteMany({ quiz: quiz.id })
			await Review.deleteMany({ quiz: quiz.id })
			await Taken.deleteMany({ quiz: quiz.id })
		})
	)

	// delete the quizzes by this user

	await Quiz.deleteMany({ author: req.user.id })

	// delete the user
	await User.findByIdAndDelete(req.user.id)

	// log out the user by clearing the cookie

	res.cookie('jwt', 'deleted user', {
		expires: new Date(Date.now() - 100000),
		httpOnly: true,
	})

	// redirect to the home page...
	res.redirect('/')
})
