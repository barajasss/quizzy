// core modules

const path = require('path')

//3rd party modules/developer modules

const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const sslRedirect = require('heroku-ssl-redirect')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')

const errorController = require('./controllers/errorController')

// INSTANTIATE EXPRESS APP

const app = express()

// app.use(cors())
app.use(sslRedirect())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())

// routers

const mainRouter = require('./routes/mainRoutes')
const quizRouter = require('./routes/quizRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reivewRoutes')
const heartRouter = require('./routes/heartRoutes')

// middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// mounted routes

app.use('/', mainRouter)
app.use('/quizzes', quizRouter)
app.use('/users', userRouter)
app.use('/reviews', reviewRouter)
app.use('/hearts', heartRouter)

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
