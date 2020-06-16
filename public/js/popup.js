const deleteAccountBtn = document.getElementById('button--delete-account')
const deleteAccountForm = document.getElementById('form--delete-account')
const deleteQuizBtns = document.querySelectorAll('.button--delete-quiz')
const deleteQuizForms = document.querySelectorAll('.form--delete-quiz')

// execute the popup on each of the delete quiz buttons

for (let i = 0; i < deleteQuizBtns.length; i++) {
	;(function (i) {
		deleteQuizBtns[i].addEventListener('click', e => {
			e.preventDefault()
			const popupEl = createPopupEl('Confirm delete Quiz ?')

			document.body.insertAdjacentElement('afterbegin', popupEl)

			document.getElementById('yes-btn').addEventListener('click', () => {
				deleteQuizForms[i].submit()
				document.body.removeChild(popupEl)
			})
			document.getElementById('no-btn').addEventListener('click', () => {
				document.body.removeChild(popupEl)
			})
		})
	})(i)
}

// delete account with the popup prompt

deleteAccountBtn.addEventListener('click', e => {
	e.preventDefault()
	const popupEl = createPopupEl('Do you really want to delete your account ?')
	document.body.insertAdjacentElement('afterbegin', popupEl)
	document.getElementById('yes-btn').addEventListener('click', () => {
		deleteAccountForm.submit()
		document.body.removeChild(populEl)
	})
	document.getElementById('no-btn').addEventListener('click', () => {
		document.body.removeChild(popupEl)
	})
})

function createPopupEl(msg) {
	const html = document.createElement('div')
	const popup = `
		<h3>
			${msg}
		</h3>
		<div class="popup__controls">
			<button id="no-btn" class="popup__btn">No</button>
			<button id="yes-btn" class="popup__btn danger">Yes</button>
		</div>
	`
	html.innerHTML = popup
	html.className = 'popup'
	return html
}
