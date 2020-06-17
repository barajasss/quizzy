const addQuestionBtn = document.getElementById('add-question-btn')
const deleteQuestionBtn = document.getElementById('delete-question-btn')
const createQuizForm = document.getElementById('create-quiz-form')
const questionContainer = document.getElementById('question-container')

let questionCtr = 0

addQuestion(questionCtr)

document.addEventListener('keydown', e => {
	if (e.keyCode === 13) {
		e.stopPropagation()
		return false
	}
})

addQuestionBtn.addEventListener(
	'mousedown',
	e => {
		e.preventDefault()
		questionCtr++
		addQuestion(questionCtr)
	},
	false
)

deleteQuestionBtn.addEventListener('click', e => {
	e.preventDefault()
	if (questionCtr >= 1) {
		let div = document.querySelector('div.form__question:last-child')
		div.parentNode.removeChild(div)
		questionCtr--
	}
})

function addQuestion(num) {
	let html = document.createElement('div')
	html.className = 'form__question'
	questionContainer.appendChild(html)
	html.innerHTML = `
        <h3>Question - ${num + 1}</h3>
        <div class="form-group">
            <label for="form__question--${num}" class="form__label">Question</label>
            <input id="form__question--${num}" class="form__input" type="text" name="questions[]" required> 
        </div>
        
        <div class="form-group">
            <label for="form__option--${num}0" class="form__label">Option 'a'</label>
            <input id="form__option--${num}0" class="form__input" type="text" name="options[${num}][0]" required> 
        </div>
        
        <div class="form-group">
            <label for="form__option--${num}1" class="form__label">Option 'b'</label>
            <input id="form__option--${num}1" class="form__input" type="text" name="options[${num}][1]" required> 
        </div>
        
        <div class="form-group">
            <label for="form__option--${num}2" class="form__label">Option 'c'</label>
            <input id="form__option--${num}2" class="form__input" type="text" name="options[${num}][2]" required> 
        </div>


        <div class="form-group">
            <label for="form__option--${num}3" class="form__label">Option 'd'</label>
            <input id="form__option--${num}3" class="form__input" type="text" name="options[${num}][3]" required> 
        </div>

        
        <div class="form-group">
            <h4>Answer: </h4>
        <div class="form__answer">
            <label for="form__answer--${num}0" class="form__label form__answer__label">a</label>
            <input id="form__answer--${num}0" type="radio" name="answers[${num}]" value="a" checked> 
        </div>
        <div class="form__answer">
            <label for="form__answer--${num}1" class="form__label form__answer__label">b</label>
            <input id="form__answer--${num}1" type="radio" name="answers[${num}]" value="b"> 
        </div>


        <div class="form__answer">
            <label for="form__answer--${num}2" class="form__label form__answer__label">c</label>
            <input id="form__answer--${num}2" type="radio" name="answers[${num}]" value="c"> 
        </div>
        <div class="form__answer">
            <label for="form__answer--${num}3" class="form__label form__answer__label">d</label>
            <input id="form__answer--${num}3" type="radio" name="answers[${num}]" value="d"> 
        </div>
    `
}
