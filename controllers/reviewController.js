const Review = require('../models/reviewModel')
const catchAsync = require('../utils/catchAsync')

exports.addReview = catchAsync(async (req, res, next) => {
	await Review.create({
		user: req.user.id,
		quiz: req.body.quizId,
		review: req.body.review,
	})
	res.redirect(`/quizzes/${req.body.quizId}`)
})

exports.updateReview = catchAsync(async (req, res, next) => {
	await Review.updateOne(
		{
			user: req.user.id,
			quiz: req.body.quizId,
		},
		{
			review: req.body.review,
		}
	)
	res.redirect(`/quizzes/${req.body.quizId}`)
})
