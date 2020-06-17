const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
		},
		message: {
			type: String,
			required: [true, 'Message is required'],
		},
	},
	{
		timestamps: true,
	}
)

const Message = mongoose.model('Message', messageSchema)
module.exports = Message
