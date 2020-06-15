const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.isLoggedIn = catchAsync(async (req, res, next) => {
	if (req.cookies.jwt) {
		const userToken = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET)
		const user = await User.findOne({ _id: userToken.id })
			.populate('quizzesCreated', 'title')
			.populate('quizzesTaken', '-user')
		if (user) {
			res.locals.user = user
			req.user = user
			res.locals.isLoggedIn = true
		}
	}
	next()
})

exports.protect = catchAsync(async (req, res, next) => {
	let token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1]
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt
	} else {
		return next(new AppError('Please login to continue', 401))
	}
	const userToken = jwt.verify(token, process.env.JWT_SECRET)
	const user = await User.findOne({ _id: userToken.id })
		.populate('quizzesCreated', 'title')
		.populate({
			path: 'quizzesTaken',
			populate: {
				path: 'quiz',
				select: {
					title: 1,
				},
			},
		})
	if (user) {
		req.user = user
		res.locals.user = user
		res.locals.isLoggedIn = true
	} else {
		return next(new AppError('Please login to your account', 401))
	}
	next()
})
