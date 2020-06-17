const mongoose = require('mongoose')
const Quiz = require('../models/quizModel')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: [true, 'Username is required'],
		minlength: [6, 'Username should be minimum 6 characters long'],
		maxlength: [30, 'Username cannot exceed more than 30 characters'],
	},
	email: {
		type: String,
		validate: [validator.isEmail, 'Please enter a valid email address'],
		unique: [true, 'There is already an account with this email address'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [6, 'Minimum password length is 6'],
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Confirm password is required'],
		minlength: [6, 'Min length of confirm password is 6'],
		validate: {
			validator: function (val) {
				return this.password === val
			},
			message: 'Password and password confirm must match',
		},
	},
	image: {
		type: String,
		default: 'user.png',
	},
	role: {
		type: String,
		enum: {
			values: ['admin', 'user'],
			message: 'The user role must be admin or user',
		},
		default: 'user',
	},
})

userSchema.virtual('quizzesCreated', {
	ref: 'Quiz',
	localField: '_id',
	foreignField: 'author',
})

userSchema.virtual('quizzesTaken', {
	ref: 'Taken',
	localField: '_id',
	foreignField: 'user',
})

userSchema.virtual('quizzesImportant', {
	ref: 'Important',
	localField: '_id',
	foreignField: 'user',
})

userSchema.pre('save', async function (next) {
	try {
		this.password = await bcrypt.hash(this.password, 11)
		this.passwordConfirm = undefined
	} catch (err) {
		console.log(err)
	}
	next()
})

userSchema.methods.createToken = function (userId) {
	const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: '30days',
	})
	return token
}

userSchema.methods.correctPassword = async function (password) {
	const comparedPasswordResult = await bcrypt.compare(password, this.password)
	return comparedPasswordResult
}

const User = mongoose.model('User', userSchema)

module.exports = User
