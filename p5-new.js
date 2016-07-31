#!/usr/bin/env node

var program = require('commander');
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');
var p5js = loadTemplate('p5.js');
var p5dminjs = loadTemplate('p5.min.js');
var p5domjs = loadTemplate('p5.dom.js');
var p5soundjs = loadTemplate('p5.sound.js');
var sketchjs = loadTemplate('sketch.js');
var indexhtml = loadTemplate('index.html');

program
	.version('0.0.1')
	.option('-c, --collection <cname>', 'initialize a p5 sketches collection')
	.parse(process.argv);

if(program.collection) {
	mkdir(program.collection, function() {
		mkdir(program.collection + '/libraries', function() {
			write(program.collection + '/libraries/p5.js', p5js);
			write(program.collection + '/libraries/p5.min.js', p5minjs);
			write(program.collection + '/libraries/p5.sound.js', p5soundjs);
			write(program.collection + '/libraries/p5.dom.js', p5domjs);
		});
	})
}

program
	.command('new <project name>')
	.description('generate a new p5 sketch')
	.action(function(req, opt) {
		var projectPath = req;
		mkdir(projectPath, function() {
			write(projectPath + '/sketch.js', sketchjs);
			write(projectPath + '/index.html', indexhtml);	
		});
	});


program.parse(process.argv);


function loadTemplate(name) {
  return fs.readFileSync(path.join(__dirname, 'static', name), 'utf-8');
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