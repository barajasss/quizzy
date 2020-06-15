const mongoose = require('mongoose')
const catchAsync = require('../utils/catchAsync')
const Important = require('./importantModel')

const quizSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
	},
	description: {
		type: String,
		required: [true, 'Description is reuqired'],
	},
	author: {
		type: mongoose.Types.ObjectId,
		required: [true, 'User is required'],
		ref: 'User',
	},
	difficulty: {
		type: String,
		enum: {
			values: ['easy', 'medium', 'hard'],
			message: 'Difficulty must be either easy | medium | hard',
		},
	},
	questions: [
		{
			type: Object,
			question: {
				type: String,
				required: [true, 'Question for the quiz is required'],
			},
			answer: {
				type: String,
				enum: ['a', 'b', 'c', 'd'],
				required: [true, 'Answer for the quiz is required'],
			},
			options: {
				type: [
					{
						type: String,
					},
				],
				required: [true, 'Options is required'],
				validate: {
					validator: function (val) {
						return val.length === 4
					},
					message: 'A total of 4 options must be specified',
				},
			},
		},
	],
	image: {
		type: String,
		default: 'quiz.jpg',
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
})

quizSchema.statics.includeImportant = async (quiz, userId) => {
	let importantQuizIds = await Important.find({
		user: userId,
	})
	if (importantQuizIds.length > 0) {
		importantQuizIds = importantQuizIds.map(important =>
			important.quiz.toString()
		)
	}
	if (importantQuizIds.includes(quiz.id.toString())) {
		quiz.important = true
	} else {
		quiz.important = false
	}
	return quiz
}

const Quiz = mongoose.model('Quiz', quizSchema)
module.exports = Quiz
