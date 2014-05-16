Pattern.defineEntities([ 
	{ 
		name:'task', 
		definition: function(word) { 
			if(typeof word == 'string' || word instanceof String) return word;
			else return false;
		} 
	}, 
	{ 
		name:'date', 
		definition: function(word) { 
			var parsed = Date.parse(word);
			if(parsed && (parsed.toString('HH:mm') == '00:00')) return parsed;
			else return false;
		} 
	},
	{ 
		name:'time', 
		definition: function(word) { 
			var parsed = Date.parse(word);
			if(parsed && (parsed.toString('M-d-yyyy') == Date.today().toString('M-d-yyyy')) && (parsed.toString('HH:mm') != '00:00')) return parsed;
			else if(word == '12pm' || word == '12:00pm' || word =='midnight' || word == '00:00') return parsed;
			else return false;
		} 
	},
	{ 
		name:'qualifier', 
		definition: function(str) { 
			var qualifiers = ['by', 'at', 'on', 'between']
			return (qualifiers.indexOf(str) > -1)
		} 
	}
])

Pattern.defineRules([
	'task',
	'date',
	'task date',
	'task time',
	'task date time',
	'task qualifier date',
	'task qualifier time', 
	'task qualifier time date',
	'task date qualifier time',
	'task qualifier time qualifier date',
	'task qualifier date qualifier time'
])

var displayMatch = function(match) {
	var match = match.toObject(),
		$taskList = $('#content ul'),
		$elem = $(document.createElement('li'))

	if(match.task) {
		$elem.append('<p class="task">'+match.task+'</p>')
	}
	if(match.time) {
		$elem.append('<span class="time">'+match.time+'</span>')
	}

	$taskList.append($elem)

}

var displayMatches = function(matches) {
	console.log(matches)
	var bestGuess = { depth: 0 },
		$taskList = $('#content ul')
	$.each(matches, function(id, match) {
		if(match.depth > bestGuess.depth) {
			bestGuess = match
		}
	})
	displayMatch(bestGuess)
}

$.fn.exchangePositionWith = function(selector) {
    var other = $(selector);
    this.after(other.clone());
    other.after(this).remove();
}

$('#pattern').on('keydown', function(e) {
	var keyCode = e.keyCode || e.which
	if (keyCode == 13) {
		e.preventDefault()
		var matches = Pattern.match($(this).html())
		displayMatches(matches)
		$(this).html('')
	} else if (keyCode == 9) { 
		e.preventDefault()
	} 
})

//displayMatches(Pattern.match('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum by 9pm'))
//displayMatches(Pattern.match('Do security homework at 11pm'))

