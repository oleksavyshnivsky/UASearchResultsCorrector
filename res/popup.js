var timeout_id
function hideMsgbox() {
	Array.from(document.getElementsByClassName('show')).forEach((el) => el.classList.remove('show', 'success', 'error'))
}

// ————————————————————————————————————————————————————————————————————————————————
// ————————————————————————————————————————————————————————————————————————————————
// Додати новий вебсайт у список блокування — ПОРІВНЯТИ З options.js
function addBlockedWebsite() {
	clearTimeout(timeout_id)
	var website = document.getElementById('newblockedwebsite').value
	chrome.storage.sync.get('blockedwebsites', function(data) {
		var blockedwebsites = data.blockedwebsites ? data.blockedwebsites : []
		if (website && !blockedwebsites.includes(website)) {
			try {
				new RegExp(website, 'gi')

				blockedwebsites.push(website)
				// Запис у сховище
				var jsonObj = {}
				jsonObj.blockedwebsites = blockedwebsites
				chrome.storage.sync.set(jsonObj, function() {
					console.log('Новий елемент масиву записаний')
				})
				// 
				document.getElementById('newblockedwebsite').value = ''
				document.getElementById('form-newblockedwebsite').previousElementSibling.classList.add('show', 'success')
				document.getElementById('form-newblockedwebsite').previousElementSibling.innerText = 'Виконано'
				timeout_id = setTimeout(hideMsgbox, 2000)

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
// ————————————————————————————————————————————————————————————————————————————————
// Додати новий вебсайт у список блокування — ПОРІВНЯТИ З popup.js
function addNewRule() {
	clearTimeout(timeout_id)
	var newruleB = document.getElementById('newruleB').value
	var newruleA = document.getElementById('newruleA').value
	chrome.storage.sync.get('linkrules', function(data) {
		var linkrules = data.linkrules ? data.linkrules : []
		if (newruleB && newruleA && newruleA !== newruleB) {
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
				document.getElementById('form-newrule').previousElementSibling.classList.add('show', 'success')
				document.getElementById('form-newrule').previousElementSibling.innerText = 'Виконано'
				timeout_id = setTimeout(hideMsgbox, 2000)
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
// ————————————————————————————————————————————————————————————————————————————————
// СТАРТОВІ ЗАВДАННЯ
// Дія "Додати новий заблокований сайт"
document.getElementById('form-newblockedwebsite').onsubmit = function(e) {
	e.preventDefault()
	addBlockedWebsite()
}

// Дія "Додати нове правило"
document.getElementById('form-newrule').onsubmit = function(e) {
	e.preventDefault()
	addNewRule()
}

document.getElementById('newblockedwebsite').onchange = hideMsgbox
document.getElementById('newruleB').onchange = hideMsgbox
document.getElementById('newruleA').onchange = hideMsgbox
