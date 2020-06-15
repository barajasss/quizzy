const mongoose = require('mongoose')

const importantSchema = new mongoose.Schema({
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
})

importantSchema.index({ user: 1, quiz: 1 }, { unique: true })

const Important = mongoose.model('Important', importantSchema)

module.exports = Important
