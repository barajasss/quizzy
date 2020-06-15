const mongoose = require('mongoose')

const takenSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: [true, 'User is required'],
	},
	quiz: {
		type: mongoose.Types.ObjectId,
		ref: 'Quiz',
		required: [true, 'Quiz is required'],
	},
	points: {
		type: Number,
		required: [true, 'Points is required'],
		validate: {
			validator: function (val) {
				return val <= this.totalPoints
			},
			message: 'Points cannot be larger than total points',
		},
	},
	totalPoints: {
		type: Number,
		required: [true, 'Total points is required'],
	},
})

takenSchema.index({ user: 1, quiz: 1 }, { unique: true })

const Taken = mongoose.model('Taken', takenSchema)

module.exports = Taken
