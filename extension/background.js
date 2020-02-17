chrome.runtime.onInstalled.addListener(function() {
	// Статус:
	// 	1 — виконувати блокування
	// 	0 — ні
	chrome.storage.local.set({status: 1}, function() {
		console.log('Статус активності виставлений')
	})

	chrome.storage.sync.set({blockedwebsites: ['\\.ru$', '\\.su$']}, function() {
		console.log('Список заблокованих вебсайтів записаний.')
	})

	chrome.storage.sync.set({linkrules: [
			['/ru/', '/en/'],
			['ru-ru', 'en-global'],
			['hl=ru', 'hl=en'],
		]}, function() {
		console.log('Список правил виправлення посилань записаний.')
	})

	// Розширення працює на www.google.com
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: {hostEquals: 'www.google.com'},
				})
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}])
	})
})
