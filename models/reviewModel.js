const mongoose = require('mongoose')
const validator = require('validator')

const reviewSchema = mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: [true, 'User ID is required'],
	},
	quiz: {
		type: mongoose.Types.ObjectId,
		ref: 'Quiz',
		required: [true, 'Quiz ID is required'],
	},
	review: {
		type: String,
		required: [true, 'Review is required'],
	},
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review
