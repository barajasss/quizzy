class AppError extends Error {
	constructor(message, statusCode, name = 'Error') {
		super(message)
		this.name = name
		this.statusCode = statusCode || 500
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'success'
		this.isOperational = true
	}
}

module.exports = AppError
