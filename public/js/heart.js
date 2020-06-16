const heartContainer = document.getElementById('heart-container')
const heartsEl = document.getElementById('hearts')

heartContainer.addEventListener(
	'click',
	() => {
		heartsEl.textContent = Number(heartsEl.textContent) + 1
	},
	false
)
