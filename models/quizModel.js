const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
	},
	description: {
		type: String,
		required: [true, 'Description is reuqired'],
	},
	difficulty: {
		type: String,
		enum: {
			values: ['easy', 'medium', 'hard'],
			message: 'Difficulty must be either easy | medium | hard',
		},
	},
	// userId is the _id of the user who created the quiz

	// remove this comment after user model is created

	// userId: {
	// 	type: mongoose.Types.ObjectId,
	// 	ref: 'User',
	// 	required: [true, 'userId is required'],
	// },
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

const Quiz = mongoose.model('Quiz', quizSchema)
module.exports = Quiz
