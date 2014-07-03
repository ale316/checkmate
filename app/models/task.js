var mongoose = require('mongoose')
var Schema 	 = mongoose.Schema
var moment	 = require('moment')

var taskSchema = new Schema({
	body: String,
	type: String, // types: Event, Deadline
	
	start: Date,
	end: Date,

	_user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Task', taskSchema) 