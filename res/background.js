chrome.runtime.onInstalled.addListener(function() {

	chrome.storage.sync.set({blockedwebsites: ['\.ru$', '\.su$']}, function() {
		console.log('Список заблокованих вебсайтів записаний.')
	})

	chrome.storage.sync.set({linkrules: [
			['/ru/', '/en/'],
			['ru-ru', 'en-global'],
			['hl=ru', 'hl=en'],
		]}, function() {
		console.log('Список правил виправлення посилань записаний.')
	})

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
