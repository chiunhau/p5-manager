var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');

var templates = {
	sketchjs: loadFile('templates/sketch.js'),
	indexhtml: loadFile('templates/index.html')
}

var libraries = {
	p5js: loadFile('libraries/p5.js'),
	p5minjs: loadFile('libraries/p5.min.js'),
	p5domjs: loadFile('libraries/p5.dom.js'),
	p5soundjs: loadFile('libraries/p5.sound.js')
}

var generator = {
	collection: function(collection, opt) {
		var p5rc = {
			name: collection,
			projects: []
		};
		
		mkdir(collection, function() {
			write(collection + '/.p5rc', JSON.stringify(p5rc, null, 2));
			mkdir(collection + '/libraries', function() {
				write(collection + '/libraries/p5.js', libraries.p5js);
				write(collection + '/libraries/p5.min.js', libraries.p5minjs);
				write(collection + '/libraries/p5.sound.js', libraries.p5soundjs);
				write(collection + '/libraries/p5.dom.js', libraries.p5domjs);
			});
		});
	},
	project: function(project, opt) {
		var p5rc = JSON.parse(fs.readFileSync('.p5rc', 'utf-8'));
		p5rc.projects.push(project);
		write('.p5rc', JSON.stringify(p5rc, null, 2));
		mkdir(project, function() {
			if (opt.es6) {
				write(project + '/sketch.es6', templates.sketchjs);
			}
			else {
				write(project + '/sketch.js', templates.sketchjs);
			}
			write(project + '/index.html', templates.indexhtml);
		});
	}
}

// the following code are taken from https://github.com/expressjs/generator

function loadFile(name) {
  return fs.readFileSync(path.join(__dirname, name), 'utf-8');
}

function write(path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || 0666 });
  console.log('   \x1b[36mcreate\x1b[0m : ' + path);
}

function mkdir(path, fn) {
  mkdirp(path, 0755, function(err){
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
    fn && fn();
  });
}

module.exports = generator;