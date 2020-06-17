const answerForms = document.getElementsByClassName('form__answer')
const radioBtns = document.getElementsByClassName('form__radio')

for (let i = 0; i < answerForms.length; i++) {
	answerForms[i].addEventListener(
		'click',
		(i => e => {
			for (let j = 0; j < answerForms.length; j++) {
				answerForms[j].style.backgroundColor = ''
			}
			answerForms[i].style.backgroundColor = 'lightgreen'
			radioBtns[i].checked = true
		})(i),
		false
	)
}
