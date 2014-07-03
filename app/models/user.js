var mongoose = require('mongoose')
var Schema 	 = mongoose.Schema
var moment	 = require('moment')

var userSchema = new Schema({
	name: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true }
})

module.exports = mongoose.model('User', userSchema)