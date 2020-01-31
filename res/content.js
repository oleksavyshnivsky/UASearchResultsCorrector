(function() {
	'use strict';
	// Користувацькі дані
	// let websites2block = ['ubuntu.fliplinux.com', 'www.php.su']
	let websites2block = []

	chrome.storage.sync.get('websites2block', function(data) {
		websites2block = data.websites2block
	})

	
	function getFromLS() {
		websites2block = JSON.parse(localStorage.getItem('src-websites-blocked'))
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
	function removewebsites2block() {
		var blockedN = 0
		Array.from(document.getElementsByClassName('g')).forEach((el) => {
			var url = el.getElementsByTagName('a')[0].href
			url = new URL(url)
			if (websites2block.includes(url.hostname)) {
				blockedN++
				var html = el.innerHTML
				el.setAttribute('data-blockedhtml', html)
				el.innerHTML = '<span class="ode-blocked" -style="color: red;">[Усунено результат з ' + url.hostname + '] '
			}
		})
	}



	// Заміна посилань
	Array.from(document.getElementsByClassName('g')).forEach((el) => {
		el.innerHTML = el.innerHTML.replace(/\/ru\//gi, '/en/')
	})
	// Зміна описів
	Array.from(document.getElementsByClassName('s')).forEach((el) => {
		if (isthistextru(el.innerText)) el.innerHTML = '<span class="ode-blocked" -style="color: red;">[усунено]</span>'
	})


	removewebsites2block()


	// Найближчий батьківський елемент
	function closest (el, predicate) {
		do if (predicate(el)) return el;
		while (el = el && el.parentNode);
	}
})()
