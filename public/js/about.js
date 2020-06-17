const messageForm = document.getElementById('form--message')
const formStatus = document.getElementById('form--status')
const inputName = document.getElementById('input--name')
const inputMessage = document.getElementById('input--message')
const sendMessageBtn = document.getElementById('button--send-message')

messageForm.addEventListener('submit', function (e) {
	e.preventDefault()
	sendMessageBtn.textContent = 'Sending...'
	fetch('/message', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: inputName.value,
			message: inputMessage.value,
		}),
	})
		.then(res => res.json())
		.then(data => {
			formStatus.innerHTML = `
				<i class="fas fa-smile" style="color: green"></i>
					<span style="color: rgb(16, 145, 16);">
						Your message was sent to Baraja
					</span>
					<i class="fas fa-check" style="color: green">
				</i>
			`
			messageForm.innerHTML = ''
		})
		.catch(err => {
			console.log(err)
			formStatus.innerHTML = `
				<i class="fas fa-frown" style="color: red"></i>
					<span style="color: red">
						Couldn't sent message
					</span>
				<i class="fas fa-times-circle" style="color: red"></i>
			`
		})
})
