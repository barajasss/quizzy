// const nodemailer = require('nodemailer')
const catchAsync = require('./catchAsync')

// const transporter = nodemailer.createTransport({
// 	service: 'SendGrid',
// 	auth: {
// 		user: process.env.EMAIL_USERNAME,
// 		pass: process.env.EMAIL_PASSWORD,
// 	},
// })

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = catchAsync(async mail => {
	await sgMail.send({
		from: process.env.EMAIL_ADDRESS,
		to: process.env.EMAIL_ADDRESS,
		subject: `Quizzy - New Message from ${mail.name}`,
		text: mail.message,
		html: `<h1>${mail.name} says</h1><p>${mail.message}</p>`,
	})
})

module.exports = sendMail
