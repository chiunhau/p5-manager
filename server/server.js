var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var chokidar = require('chokidar');
var babel = require('babel-core');
var es2015 = require('babel-preset-es2015');
var pug = require('pug');
var path = require('path');
var fs = require( 'fs' );
var app = express();

var assetsPath = path.join(__dirname, '../gui');
var currentPath = process.cwd();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../gui'));

app.get('/', function(req, res) {
	res.sendFile('index.html', {root: assetsPath});
});

app.get('/api/p5rc', function(req, res) {
	var p5rc = JSON.parse(fs.readFileSync('.p5rc', 'utf-8'));
	var projects = p5rc.projects;
	res.json({projects: projects, collectionName: p5rc.name})
})

app.use('/', express.static(currentPath));
app.use('/assets', express.static(assetsPath));

function readP5rc() {
	var p5rc = JSON.parse(fs.readFileSync('.p5rc', 'utf-8'));
	return p5rc;
}

function run(port) {
	app.listen(port, function () {
	  console.log('p5-manager is starting at port ' + port);
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
