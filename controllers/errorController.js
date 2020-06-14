const loginError = (err, req, res) => {
	req.app.locals.err = err
	res.redirect('/login')
}
const signUpError = (err, req, res) => {
	let errors = []
	Object.keys(err.errors).forEach(error => {
		errors.push(err.errors[error].properties.message)
	})
	req.app.locals.err = errors
	res.redirect('/signup')
}
module.exports = (err, req, res, next) => {
	console.log('Error Name:', err.name, err)
	if (!err.statusCode) {
		err.statusCode = err.status ? err.status : 500
	}
	if (err.name === process.env.LOGIN_ERROR) return loginError(err, req, res)
	if (err.name === 'ValidationError') return signUpError(err, req, res)

	res.status(err.statusCode).render('error', {
		err,
	})
}
