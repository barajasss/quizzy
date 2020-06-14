const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.isLoggedIn = catchAsync(async (req, res, next) => {
	if (req.cookies.jwt) {
		const userToken = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET)
		const user = await User.findOne({ _id: userToken.id })
		if (user) {
			res.locals.user = user
			req.user = user
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
	const user = User.findOne({ _id: userToken.id })
	if (user) {
		req.user = user
		res.locals.user = user
	} else {
		return next(new AppError('Please login to your account', 401))
	}
	next()
})
