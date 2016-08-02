var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var path = require('path');
var fs = require( 'fs' );

var app = express();


var serverPath = path.dirname(fs.realpathSync(__filename));
var currentPath = process.cwd();


app.use(express.static(currentPath));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});


function run(port) {
	app.listen(port, function () {
	  console.log('Example app listening on port 3000!');
	  console.log('Server path: ' + serverPath);
	  console.log('Current path: ' + currentPath);
	});
}

var server = {
	app: app,
	run: run
}

module.exports = server;
