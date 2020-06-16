const url = require('url')

const loginError = (err, req, res) => {
	req.app.locals.err = err
	res.redirect('/login')
}
const signUpError = (err, req, res) => {
	let errors = []
	if (err.code === 11000) {
		errors.push(`${Object.keys(err.keyValue)[0]} already exists.`)
	} else {
		Object.keys(err.errors).forEach(error => {
			errors.push(err.errors[error].properties.message)
		})
	}
	console.log('errors', errors)
	req.app.locals.err = errors
	res.redirect('/signup')
}

module.exports = (err, req, res, next) => {
	console.log('Error Name:', err.name, err)
	if (!err.statusCode) {
		err.statusCode = err.status ? err.status : 500
	}
	if (err.name === process.env.LOGIN_ERROR) return loginError(err, req, res)
	if (
		(req.path === '/users/signup' && err.name === 'ValidationError') ||
		err.code === 11000
	)
		return signUpError(err, req, res)
	if (err.isOperational) {
		// friendly error thrown by the developer
		return res.status(err.statusCode).render('error', {
			err,
		})
	}
	res.status(500).render('error', {
		err: {},
	})
}
