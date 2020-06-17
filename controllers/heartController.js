const Heart = require('../models/heartModel')
const catchAsync = require('../utils/catchAsync')

exports.getHearts = catchAsync(async (req, res, next) => {
	let heartDoc = await Heart.findOne()
	if (!heartDoc) {
		heartDoc = await Heart.create({ hearts: 0 })
	}
	res.status(200).json({
		hearts: heartDoc.hearts,
	})
})

exports.increment = async (req, res, next) => {
	let heartDoc = await Heart.findOne()
	if (!heartDoc) {
		heartDoc = new Heart()
	}
	heartDoc.hearts = Number(req.body.hearts)
	await heartDoc.save()
	res.status(200).json({
		hearts: heartDoc.hearts,
	})
}
