const Quiz = require('../models/quizModel')

exports.getHomePage = async (req, res, next) => {
	const quizzes = await Quiz.find()
	res.render('index', {
		quizzes: quizzes,
	})
}
