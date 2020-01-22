(function() {
	'use strict';
	// Користувацькі дані
	let blockedwebsites = ['ubuntu.fliplinux.com', 'www.php.su']
	function getFromLS() {
		blockedwebsites = JSON.parse(localStorage.getItem('src-websites-blocked'))
	}
	function setInLS() {
		localStorage.setItem('src-websites-blocked')
	}
	// Language detector
	function isthistextru(text) {
		return (
			text.includes('ы')
			|| text.includes('Ы')
			|| text.includes('э')
			|| text.includes('Э')
			|| text.includes('ъ')
			|| text.includes('Ъ')
		)
	}
	// Видалення непотрібних результатів
	function removeBlockedWebsites() {
		var blockedN = 0
		Array.from(document.getElementsByClassName('g')).forEach((el) => {
			var url = el.getElementsByTagName('a')[0].href
			url = new URL(url)
			if (blockedwebsites.includes(url.hostname)) {
				blockedN++
				var html = el.innerHTML
				el.setAttribute('data-blockedhtml', html)
				el.innerHTML = '<span style="color: red;">[Усунено результат з ' + url.hostname + '] '
			}
		})
	}



	// Заміна посилань
	Array.from(document.getElementsByClassName('g')).forEach((el) => {
		el.innerHTML = el.innerHTML.replace(/\/ru\//gi, '/en/')
	})
	// Зміна описів
	Array.from(document.getElementsByClassName('s')).forEach((el) => {
		if (isthistextru(el.innerText)) el.innerHTML = '<span style="color: red;">[усунено]</span>'
	})


	removeBlockedWebsites()


	// Найближчий батьківський елемент
	function closest (el, predicate) {
		do if (predicate(el)) return el;
		while (el = el && el.parentNode);
	}
})()
