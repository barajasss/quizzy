// 3rd party modules
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// express app

const app = require('./app')

// server configuration code

dotenv.config()
const port = process.env.PORT || 3000

mongoose
	.connect(process.env.DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
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
