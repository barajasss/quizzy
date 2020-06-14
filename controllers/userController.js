const User = require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

const createCookie = (user, res, id) => {
	res.cookie('jwt', user.createToken(id), {
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

	if (!user || !user.correctPassword(password)) {
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
	})
	res.redirect('/')
}

exports.getLogin = (req, res, next) => {
	res.redirect('/login')
}

exports.getSignup = (req, res, next) => {
	res.redirect('/signup')
}
