const mongoose = require('mongoose')
const heartSchema = mongoose.Schema({
	hearts: Number,
})

const Heart = mongoose.model('Heart', heartSchema)

module.exports = Heart
