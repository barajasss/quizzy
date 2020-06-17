const heartContainer = document.getElementById('heart-container')
const heartsEl = document.getElementById('hearts')
let timeout
let clicking

fetch('/hearts')
	.then(res => res.json())
	.then(data => {
		heartsEl.textContent = data.hearts
	})
	.catch(err => {
		console.log(err)
	})

heartContainer.addEventListener(
	'click',
	() => {
		heartsEl.textContent = Number(heartsEl.textContent) + 1
		// clear all timeouts
		let id = setTimeout(() => {}, 0)
		while (id--) {
			clearTimeout(id)
		}
		setTimeout(() => {
			fetch('/hearts/increment', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					hearts: heartsEl.textContent,
				}),
			})
				.then(res => res.json())
				.then(data => {
					heartsEl.textContent = data.hearts
				})
				.catch(err => {
					console.log(err)
				})
		}, 1000)
	},
	false
)
