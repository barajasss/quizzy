const mongoose = require('mongoose')

const User = require('../models/userModel')
const Review = require('../models/reviewModel')
const Quiz = require('../models/quizModel')
const Taken = require('../models/takenModel')
const Important = require('../models/importantModel')

const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.getAddQuiz = catchAsync(async (req, res, next) => {
	res.render('quiz/addQuiz')
})

exports.postAddQuiz = catchAsync(async (req, res, next) => {
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
	const quiz = await Quiz.create({
		title: req.body.title,
		description: req.body.description,
		difficulty: req.body.difficulty,
		questions,
		author: req.user.id,
	})
	res.redirect('/')
})

exports.getQuiz = catchAsync(async (req, res, next) => {
	let quiz = await Quiz.findById(req.params.quizId)
		.populate('author', 'username')
		.populate({
			path: 'reviews',
			populate: {
				path: 'user',
			},
		})
	if (req.user) {
		quiz = await Quiz.includeImportant(quiz, req.user.id)
	}
	res.render('quiz/quizInfo', {
		quiz,
	})
})

exports.getQuizMain = catchAsync(async (req, res, next) => {
	const quiz = await Quiz.findById(req.params.quizId)
	res.render('quiz/quizMain', {
		quiz,
	})
})

exports.postQuizMain = catchAsync(async (req, res, next) => {
	const quiz = await Quiz.findById(req.params.quizId)
	let points = 0
	let totalPoints = quiz.questions.length

	quiz.questions.forEach(({ answer }, i) => {
		if (answer === req.body.answers[i]) {
			points++
		}
	})
	const quizTaken = await Taken.findOne({
		user: req.user.id,
		quiz: req.params.quizId,
	})
	if (quizTaken) {
		if (quizTaken.points < points) {
			await Taken.findOneAndUpdate(
				{ user: req.user.id, quiz: req.params.quizId },
				{ points }
			)
		}
	} else {
		await Taken.create({
			user: req.user.id,
			quiz: quiz,
			points,
			totalPoints,
		})
	}
	req.app.locals = {
		quiz,
		points,
		totalPoints,
		answers: req.body.answers,
	}
	const reviewDoc = await Review.findOne({
		user: req.user.id,
		quiz: req.params.quizId,
	})

	if (reviewDoc) {
		req.app.locals.displayUpdateReviewForm = true
		req.app.locals.reviewDoc = reviewDoc
	} else {
		req.app.locals.displayUpdateReviewForm = false
	}
	res.redirect(`/quizzes/score`)
})

exports.getScore = catchAsync(async (req, res, next) => {
	if (
		req.app.locals.quiz !== undefined &&
		req.app.locals.points !== undefined &&
		req.app.locals.totalPoints !== undefined &&
		req.app.locals.displayUpdateReviewForm !== undefined &&
		req.app.locals.answers !== undefined
	) {
		res.render('quiz/quizScore')
		req.app.locals = {}
	} else {
		res.redirect('/')
	}
})

exports.markImportant = catchAsync(async (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.quizId)) {
		return next(
			new AppError(
				'The quiz with this ID does not exist',
				400,
				'Invalid Quiz ID'
			)
		)
	}
	await Important.create({
		user: req.user.id,
		quiz: req.params.quizId,
	})
	res.redirect(req.get('referer'))
})

exports.markUnimportant = catchAsync(async (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.quizId)) {
		return next(
			new AppError(
				'The quiz with this ID does not exist',
				400,
				'Invalid Quiz ID'
			)
		)
	}
	await Important.deleteOne({
		user: req.user.id,
		quiz: req.params.quizId,
	})
	res.redirect('back')
})

exports.deleteQuiz = catchAsync(async (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.quizId)) {
		return next(
			new AppError('Invalid Object ID Provided', 400, 'INVALID QUIZ ID')
		)
	}
	await Quiz.findByIdAndDelete(req.params.quizId)
	await Review.deleteMany({ quiz: req.params.quizId })
	await Important.deleteMany({ quiz: req.params.quizId })
	await Taken.deleteMany({ quiz: req.params.quizId })
	res.redirect('back')
})
