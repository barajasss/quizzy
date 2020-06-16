const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const passwordConfirm = document.getElementById('passwordConfirm')
const signupForm = document.querySelector('#form--signup')

const errorDisplay = document.querySelector('.errors')
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const signupBtn = document.getElementById('button--signup')

signupBtn.addEventListener('click', e => {
	e.preventDefault()
	let errors = false
	errorDisplay.innerHTML = ''
	if (username.value.length < 6) {
		errorDisplay.innerHTML +=
			'<li class="error">Username must be minimum 6 characters long.</li>'
		errors = true
	}
	if (password.value.length < 6) {
		errorDisplay.innerHTML +=
			'<li class="error">Password must be minimum 6 characters long.</li>'
		errors = true
	}
	if (!emailRegex.test(email.value)) {
		errorDisplay.innerHTML +=
			'<li class="error">Please enter a valid email address.</li>'
		errors = true
	}
	if (password.value !== passwordConfirm.value) {
		errorDisplay.innerHTML +=
			'<li class="error">Password and confirm password must match</li>'
		errors = true
	}
	if (errors) {
		return
	} else {
		signupForm.submit()
	}
})
