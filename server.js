// 3rd party modules
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// express app

const app = require('./app')

// server configuration code

dotenv.config()
const port = process.env.PORT || 3000

let DB = process.env.DB_LOCAL

if (process.env.NODE_ENV === 'production') {
	DB = process.env.DB_ATLAS
	console.log('DATABASE PRODUCTON: ', DB)
}

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: true,
	})
	.then(() => {
		console.log('Database connected successfully')
	})
	.catch(err => {
		console.log('Error connecting to database')
	})

const server = app.listen(port, () =>
	console.log(`App listening at localhost:${port}`)
)
