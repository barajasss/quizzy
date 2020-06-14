// core modules

const path = require('path')

//3rd party modules/developer modules

const express = require('express')
const cookieParser = require('cookie-parser')
const errorController = require('./controllers/errorController')

// INSTANTIATE EXPRESS APP

const app = express()

// routers

const mainRouter = require('./routes/mainRoutes')
const quizRouter = require('./routes/quizRoutes')
const userRouter = require('./routes/userRoutes')

// middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// mounted routes

app.use('/', mainRouter)
app.use('/quizzes', quizRouter)
app.use('/users', userRouter)
app.all('*', (req, res, next) => {
	res.render('404', {
		url: req.originalUrl,
	})
})
app.use(errorController)

// configurations

app.set('view engine', 'ejs')
app.set('views', 'views')

module.exports = app
