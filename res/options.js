var timeout_id
function hideMsgbox() {
	Array.from(document.getElementsByClassName('show')).forEach((el) => el.classList.remove('show', 'success', 'error'))
}

// ————————————————————————————————————————————————————————————————————————————————
// ЗАБЛОКОВАНІ ВЕБСАЙТИ
// ————————————————————————————————————————————————————————————————————————————————

// Додати новий вебсайт у список блокування — ПОРІВНЯТИ З popup.js
function addBlockedWebsite() {
	clearTimeout(timeout_id)
	var website = document.getElementById('newblockedwebsite').value
	chrome.storage.sync.get('blockedwebsites', function(data) {
		blockedwebsites = data.blockedwebsites ? data.blockedwebsites : []
		if (website && !blockedwebsites.includes(website)) {
			try {
				new RegExp(website, 'gi')

				blockedwebsites.push(website)
				// Запис у сховище
				var jsonObj = {}
				jsonObj.blockedwebsites = blockedwebsites
				chrome.storage.sync.set(jsonObj, function() {
					console.log('Новий елемент збережено.')
				})
				// Оновити показаний список
				document.getElementById('newblockedwebsite').value = ''
				showBlockedWebsites()
			} catch (error) {
				console.log(error)

				document.getElementById('form-newblockedwebsite').previousElementSibling.classList.add('show', 'error')
				document.getElementById('form-newblockedwebsite').previousElementSibling.innerText = 'ПОМИЛКА. Не можу створити регулярний вираз.'
				timeout_id = setTimeout(hideMsgbox, 10000)
			}
		} else {
			document.getElementById('form-newblockedwebsite').previousElementSibling.classList.add('show', 'error')
			document.getElementById('form-newblockedwebsite').previousElementSibling.innerText = 'ПОМИЛКА. Такий запис уже доданий.'
			timeout_id = setTimeout(hideMsgbox, 10000)
		}
	})
}

// ————————————————————————————————————————————————————————————————————————————————
// Видалити сайт зі списку блокування
function unblock(website) {
	if (confirm('Ви дійсно хочете розблокувати цей сайт?')) {
		chrome.storage.sync.get('blockedwebsites', function(data) {
			blockedwebsites = data.blockedwebsites ? data.blockedwebsites : []
			if (website && blockedwebsites.includes(website)) {
				blockedwebsites.splice(blockedwebsites.indexOf(website), 1)
				// Збереження
				var jsonObj = {}
				jsonObj.blockedwebsites = blockedwebsites
				chrome.storage.sync.set(jsonObj, function() {
					console.log('Список заблокованих вебсайтів перезбережено.')
				})
				// Оновити показаний список
				showBlockedWebsites()
			}
		})
	}
}

// ————————————————————————————————————————————————————————————————————————————————
// Список заблокованих вебсайтів
function showBlockedWebsites() {
	chrome.storage.sync.get('blockedwebsites', function(data) {
		data.blockedwebsites = data.blockedwebsites ? data.blockedwebsites : []
		var html = ''
		data.blockedwebsites.forEach(function(el, i) {
			html += '<tr><td>' + el + '</td><td class="td-delete"><i data-deletesite="' + el + '">&times;</i></td></tr>'
		})
		document.getElementById('blockedwebsites-wrapper').innerHTML = '<table class="table"><tbody>' + html + '</tbody></table>'
	})
}

// ————————————————————————————————————————————————————————————————————————————————
// ПРАВИЛА ВИПРАВЛЕННЯ ПОСИЛАНЬ
// ————————————————————————————————————————————————————————————————————————————————

// Додати новий вебсайт у список блокування — ПОРІВНЯТИ З popup.js
function addNewRule() {
	clearTimeout(timeout_id)
	var newruleB = document.getElementById('newruleB').value
	var newruleA = document.getElementById('newruleA').value
	chrome.storage.sync.get('linkrules', function(data) {
		var linkrules = data.linkrules ? data.linkrules : []
		if (newruleB && newruleA && newruleB != newruleA) {
			try {
				new RegExp(newruleB, 'gi')

				linkrules.push([newruleB, newruleA])
				// Запис у сховище
				var jsonObj = {}
				jsonObj.linkrules = linkrules
				chrome.storage.sync.set(jsonObj, function() {
					console.log('Новий елемент збережено.')
				})
				// Оновити показаний список
				document.getElementById('newruleB').value = ''
				document.getElementById('newruleA').value = ''
				showLinkRules()
			} catch (error) {
				console.error(error)

				document.getElementById('form-newrule').previousElementSibling.classList.add('show', 'error')
				document.getElementById('form-newrule').previousElementSibling.innerText = 'ПОМИЛКА. Не можу створити регулярний вираз.'
				timeout_id = setTimeout(hideMsgbox, 10000)
			}
		} else {
			document.getElementById('form-newrule').previousElementSibling.classList.add('show', 'error')
			document.getElementById('form-newrule').previousElementSibling.innerText = 'ПОМИЛКА. Значення мають бути різними.'
			timeout_id = setTimeout(hideMsgbox, 10000)
		}
	})
}

// ————————————————————————————————————————————————————————————————————————————————
// Видалити сайт зі списку блокування
function removeRule(i) {
	if (confirm('Ви дійсно хочете видалити це правило?')) {
		chrome.storage.sync.get('linkrules', function(data) {
			var linkrules = data.linkrules ? data.linkrules : []
			if (linkrules[i]) {
				linkrules.splice(i, 1)
				// Збереження
				var jsonObj = {}
				jsonObj.linkrules = linkrules
				chrome.storage.sync.set(jsonObj, function() {
					console.log('Список правил перезбережено.')
				})
				// Оновити показаний список
				showLinkRules()
			}
		})
	}
}

// ————————————————————————————————————————————————————————————————————————————————
// Список заблокованих вебсайтів
function showLinkRules() {
	chrome.storage.sync.get('linkrules', function(data) {
		data.linkrules = data.linkrules ? data.linkrules : []
		var html = ''
		data.linkrules.forEach(function(el, i) {
			html += '<tr><td>'+el[0]+'</td><td>'+el[1]+'</td><td class="td-delete"><i data-deleterule="'+i+'">&times;</i></td></tr>'
		})
		document.getElementById('linkrules-wrapper').innerHTML = '<table class="table fixed"><tbody>' + html + '</tbody></table>'
	})
}

// ————————————————————————————————————————————————————————————————————————————————
// СТАРТОВІ ЗАВДАННЯ
// ————————————————————————————————————————————————————————————————————————————————
// Показати список заблокованих сайтів
showBlockedWebsites()
// Дія "Додати новий заблокований сайт"
document.getElementById('form-newblockedwebsite').onsubmit = function(e) {
	e.preventDefault()
	addBlockedWebsite()
}

// Показати список правил виправлення посилань
showLinkRules()
// Дія "Додати нове правило"
document.getElementById('form-newrule').onsubmit = function(e) {
	e.preventDefault()
	addNewRule()
}

document.onclick = function(e) {
	// Дія "Видалити правило"
	if (e.target.dataset.deleterule) removeRule(e.target.dataset.deleterule)
		// Дія "Видалити сайт"
	if (e.target.dataset.deletesite) unblock(e.target.dataset.deletesite)
}

window.onfocus = function() {
	// Показати список заблокованих сайтів
	showBlockedWebsites()
	// Показати список правил виправлення посилань
	showLinkRules()
}


document.getElementById('newblockedwebsite').onchange = hideMsgbox
document.getElementById('newruleB').onchange = hideMsgbox
document.getElementById('newruleA').onchange = hideMsgbox

