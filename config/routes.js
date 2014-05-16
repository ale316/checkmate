var controllersPath = '../app/controllers/',
	taskController  = require(controllersPath+'task')

module.exports = function(app) {
	app.get('/', taskController.index)
}