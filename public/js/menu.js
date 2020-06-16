const menuBtn = document.getElementById('button--menu')
const nav = document.getElementById('menu')
let openMenu = false
menuBtn.addEventListener(
	'click',
	function (e) {
		e.stopPropagation()
		openMenu = !openMenu
		if (openMenu) {
			nav.style.display = 'block'
		} else {
			nav.style.display = 'none'
		}
	},
	false
)
