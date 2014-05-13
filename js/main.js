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
		$taskList = $('#content ul')
	if(match.task) {
		$taskList.append('<li>'+match.task+'</li>')
	}

}

var displayMatches = function(matches) {
	var bestGuess = { depth: 0 },
		$taskList = $('#content ul')
	$.each(matches, function(id, match) {
		if(match.depth > bestGuess.depth) {
			bestGuess = match
		}
	})
	displayMatch(bestGuess)
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