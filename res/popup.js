let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
	changeColor.style.backgroundColor = data.color
	changeColor.setAttribute('value', data.color)
})

changeColor.onclick = function(element) {
	let color = element.target.value;
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.executeScript(
		  tabs[0].id,
		  {code: 'document.body.style.backgroundColor = "' + color + '";'});
	});
  }


// Додати новий вебсайт у список блокування
function newwebsite2block() {
	var newwebsite2block = document.getElementById('newwebsite2block').value
	chrome.storage.sync.get('websites2block', function(data) {
		websites2block = data.websites2block ? data.websites2block : []
		if (newwebsite2block && !websites2block.includes(newwebsite2block)) {
			websites2block.push(newwebsite2block)
			// Збереження
			var jsonObj = {}
			jsonObj.websites2block = websites2block
			chrome.storage.sync.set(jsonObj, function() {
				console.log("Saved a new array item")
			})
			// Оновити список
			showBWList()
		}
		document.getElementById('newwebsite2block').value = ''
	})
}

// Видалення сайту зі списку блокування
function unblock(website2unblock) {
	chrome.storage.sync.get('websites2block', function(data) {
		websites2block = data.websites2block ? data.websites2block : []
		if (website2unblock && websites2block.includes(website2unblock)) {
			var index = websites2block.indexOf(website2unblock)
			if (index !== -1) websites2block.splice(index, 1)
			// Збереження
			var jsonObj = {}
			jsonObj.websites2block = websites2block
			chrome.storage.sync.set(jsonObj, function() {
				console.log("Saved a new array item")
			})
			// Оновити список
			showBWList()
		}
	})
}

// Список заблокованих вебсайтів
function showBWList() {
	chrome.storage.sync.get('websites2block', function(data) {
		data.websites2block = data.websites2block ? data.websites2block : []
		var html = ''
		data.websites2block.forEach(function(el, i) {
			html += '<tr><td>' + el + '</td><td><i data-delete="' + el + '">&times;</i></td></tr>'
		})
		document.getElementById('websites2block-wrapper').innerHTML = '<table><tbody>' + html + '</tbody></table>'
	})
}

// Стартові завдання
showBWList()
document.getElementById('form-newwebsite2block').onsubmit = function(e) {
	e.preventDefault()
	newwebsite2block()
}
document.onclick = function(e) {
	if (e.target.dataset.delete) {
		unblock(e.target.dataset.delete)
	}
} 
