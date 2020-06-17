hightLightForm()

function hightLightForm() {
	const answerForms = document.getElementsByClassName('form__answer')
	const radioBtns = document.getElementsByClassName('form__radio')

	for (let i = 0; i < answerForms.length; i++) {
		answerForms[i].addEventListener(
			'click',
			(i => e => {
				let answerFormsSubset = document.getElementsByClassName(
					`form__answer${answerForms[i].dataset.group}`
				)
				for (let j = 0; j < 4; j++) {
					answerFormsSubset[j].style.backgroundColor = ''
				}
				answerForms[i].style.backgroundColor = 'lightgreen'
				radioBtns[i].checked = true
			})(i),
			false
		)
	}
}
