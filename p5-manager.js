#!/usr/bin/env node

var program = require('commander');
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');

// load templates
var p5js = loadFile('libraries/p5.js');
var p5minjs = loadFile('libraries/p5.min.js');
var p5domjs = loadFile('libraries/p5.dom.js');
var p5soundjs = loadFile('libraries/p5.sound.js');
var sketchjs = loadFile('templates/sketch.js');
var indexhtml = loadFile('templates/index.html');

program
	.command('new <collection>')
	.alias('n')
	.description('Create new p5 collection')
	.action(function(req, opt) {
		mkdir(req, function() {
			mkdir(req + '/libraries', function() {
				write(req + '/libraries/p5.js', p5js);
				write(req + '/libraries/p5.min.js', p5minjs);
				write(req + '/libraries/p5.sound.js', p5soundjs);
				write(req + '/libraries/p5.dom.js', p5domjs);
			});
		});
	});

program
	.command('generate <project>')
	.alias('g')
	.description('Generate a p5 project')
	.action(function(req, opt) {
		mkdir(req, function() {
			write(req + '/sketch.js', sketchjs);
			write(req + '/index.html', indexhtml);	
		});
	});

program.parse(process.argv);

// code by https://github.com/expressjs/generator

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