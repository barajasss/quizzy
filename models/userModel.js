const mongoose = require('mongoose')
const Quiz = require('../models/quizModel')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: [true, 'Username must be unique'],
		required: [true, 'Username is required'],
		validate: {
			validator: val => {
				return !/[^a-z0-9]+/.test(val)
			},
			message:
				'Username can only have numbers and lowercase letters, no spaces.',
		},
		minlength: [6, 'Username should be minimum 6 characters long'],
		maxlength: [15, 'Username cannot exceed more than 15 characters'],
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
