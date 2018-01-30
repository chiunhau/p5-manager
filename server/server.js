var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var chokidar = require('chokidar');
var babel = require('babel-core');
var es2015 = require('babel-preset-es2015');
var path = require('path');
var fs = require( 'fs' );
var history = require('connect-history-api-fallback');
var livereload = require('livereload');
var app = express();


var assetsPath = path.join(__dirname, '../gui');
var currentPath = process.cwd();

app.use(favicon(path.join(assetsPath, 'star.png')))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/assets', express.static(assetsPath));

app.get('/', function(req, res) {
	res.sendFile('index.html', {root: assetsPath});
});

app.get('/api/p5rc', function(req, res) {
	var p5rc = JSON.parse(fs.readFileSync('.p5rc', 'utf-8'));
	var projects = p5rc.projects;
	res.json({projects: projects, collectionName: p5rc.name})
})

app.use('/', express.static(currentPath));


function readP5rc() {
	var p5rc = JSON.parse(fs.readFileSync('.p5rc', 'utf-8'));
	return p5rc;
}

function run(port) {
	app.listen(port, function () {
	  console.log(`p5-manager started at http://localhost:${port}`);
		chokidar.watch(currentPath + '/**/*.es6', {ignore: /[\/\\]\./}).on('all', function(event, p) {
		  if (event === 'change' || event === 'add') {
	  		babel.transformFile(p, {presets: [es2015]}, function(err, result) {
	  			var outputPath = path.join(path.dirname(p), path.basename(p, '.es6') + '.js');
	  			write(outputPath, result.code);
	  		});
		  }
		});
  });
	
  livereload.createServer().watch(process.cwd());
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
