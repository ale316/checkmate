var express  = require('express'),
	mongoose = require('mongoose'),
	http	 = require('http')

var app = express()

app.use('/public',express.static(__dirname + '/public/'))

// set views folder
app.set('views', __dirname + '/app/views')
// define templating engine
app.set('view engine', 'ejs')

require('./config/routes')(app)

http.createServer(app).listen(3445)
