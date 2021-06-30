var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');
var fs = require('fs');
var livereload = require('livereload');
var app = express();

var guiPath = path.join(__dirname, '../public');
var currentPath = process.cwd();

app.use(favicon(path.join(guiPath, '/assets/star.png')));
app.use(logger('dev'));

app.use('/gui', express.static(guiPath));
app.use('/assets', express.static(path.join(guiPath, 'assets')));
app.use('/build', express.static(path.join(guiPath, 'build')));

app.get('/', function (req, res) {
	res.sendFile('index.html', { root: guiPath });
});

app.get('/api/p5rc', function (req, res) {
	var p5rc = JSON.parse(fs.readFileSync('.p5rc', 'utf-8'));
	var projects = p5rc.projects;
	res.json({ projects: projects, collectionName: p5rc.name });
});

app.use('/', express.static(currentPath));

function run(port) {
	app.listen(port, function () {
		console.log(`p5-manager is running at http://localhost:${port}`);
	});

	livereload.createServer().watch(process.cwd());
}

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

var server = {
	app: app,
	run: run,
};

module.exports = server;
