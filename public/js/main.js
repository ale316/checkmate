Pattern.defineEntities([ 
	{ 
		name:'task', 
		/*definition: function(word) { 
			if(typeof word == 'string' || word instanceof String) return word;
			else return false;
		} */
		definition: /.*/
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

var Task = function($scope) {
	$scope.tasks = [ {task:"asdasd",time:"2pm"}, {task:"asdsdfdgrttjkd",time:"3pm"} ]
	$scope.enterTask = function(e) {
		var keyCode = e.keyCode || e.which
		if (keyCode == 13) {
			e.preventDefault()
			var matches = Pattern.match($(e.target).html())
			$scope.displayMatches(matches)
			$(e.target).html('')
		} else if (keyCode == 9) { 
			e.preventDefault()
		} 
	}
	$scope.displayMatch = function(match) {
		var match = match.toObject()
		console.log(match)
		$scope.tasks.push(match)
	}
	$scope.displayMatches = function(matches) {
		console.log(matches)
		var bestGuess = { depth: 0 }
		$.each(matches, function(id, match) {
			if(match.depth > bestGuess.depth) {
				bestGuess = match
			}
		})
		$scope.displayMatch(bestGuess)
	}
}


//displayMatches(Pattern.match('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum by 9pm'))
//displayMatches(Pattern.match('Do security homework at 11pm'))

