var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var chokidar = require('chokidar');
var babel = require('babel-core');
var es2015 = require('babel-preset-es2015');
var path = require('path');
var fs = require( 'fs' );
var app = express();

var serverPath = path.dirname(fs.realpathSync(__filename));
var currentPath = process.cwd();
app.use(express.static(currentPath));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function(req, res) {
	res.send('Welcome to p5-manager! we are here to host your p5 collection: ' + path.basename(currentPath));
})

function run(port) {
	app.listen(port, function () {
	  console.log('Meet p5-manager at port 5555!');
		chokidar.watch(currentPath + '/**/*.es6', {ignore: /[\/\\]\./}).on('all', function(event, p) {
		  if (event === 'change' || event === 'add') {
	  		babel.transformFile(p, {presets: [es2015]}, function(err, result) {
	  			var outputPath = path.join(path.dirname(p), path.basename(p, '.es6') + '.js');
	  			write(outputPath, result.code);
	  		});
		  }
		});
	});
}

function write(path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || 0666 });
  console.log('   \x1b[36mmodified\x1b[0m : ' + path);	
}

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var server = {
	app: app,
	run: run
}

module.exports = server;