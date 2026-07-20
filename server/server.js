var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');
var fs = require('fs');
var livereload = require('livereload');
var app = express();

var guiPath = path.join(__dirname, '../public');
var dataPath = process.env.P5_SKETCH_DIR
	? path.resolve(process.env.P5_SKETCH_DIR)
	: path.join(__dirname, '../demo');
var generatorPath = path.join(__dirname, '../generator');

function loadCollection() {
	var configPath = path.join(dataPath, '.p5rc');

	if (fs.existsSync(configPath)) {
		return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
	}

	var projects = fs.readdirSync(dataPath, { withFileTypes: true })
		.filter(function (entry) {
			return entry.isDirectory() &&
				fs.existsSync(path.join(dataPath, entry.name, 'index.html'));
		})
		.map(function (entry) {
			return entry.name;
		})
		.sort(function (a, b) {
			return a.localeCompare(b);
		});

	console.log(
		`No .p5rc found in ${dataPath}; discovered ${projects.length} sketches.`
	);

	return {
		name: path.basename(dataPath),
		projects: projects,
	};
}

var p5rc = loadCollection();

app.use(favicon(path.join(guiPath, 'assets/star.png')));
app.use(logger('dev'));

app.use('/gui', express.static(guiPath));
app.use('/assets', express.static(path.join(guiPath, 'assets')));
app.use('/build', express.static(path.join(guiPath, 'build')));

// Serve the libraries directory
app.use('/libraries', express.static(path.join(generatorPath, 'libraries')));

app.get('/', function (req, res) {
	res.sendFile('index.html', { root: guiPath });
});

app.get('/api/p5rc', function (req, res) {
	var projects = p5rc.projects;
	res.json({ projects: projects, collectionName: p5rc.name });
});

// Dynamically serve static files for each project
p5rc.projects.forEach((project) => {
	var projectPath = path.join(dataPath, project);
	console.log(
		`Serving static files for project: ${project} from ${projectPath}`
	);
	app.use(
		`/${project}`,
		(req, res, next) => {
			console.log(`------------------------------`)
			console.log(`Request URL: ${req.originalUrl}`);
			console.log(`Serving from: ${projectPath}`);
			next();
		},
		express.static(projectPath)
	);
});

app.use('/', express.static(dataPath));

function run(port) {
	app.listen(port, function () {
		console.log(`p5-manager is running at http://localhost:${port}`);
		console.log(`Serving sketches from ${dataPath}`);
	});

	livereload.createServer().watch(dataPath);
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
