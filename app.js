// core modules

const path = require('path')

//3rd party modules

const express = require('express')

// INSTANTIATE EXPRESS APP

const app = express()

// routers

const mainRouter = require('./routes/mainRoutes')
const quizRouter = require('./routes/quizRoutes')

// middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// mounted routes

app.use('/', mainRouter)
app.use('/quizzes', quizRouter)

// configurations

app.set('view engine', 'ejs')
app.set('views', 'views')

module.exports = app
