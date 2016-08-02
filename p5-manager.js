#!/usr/bin/env node

var program = require('commander');
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');
var exec = require('child_process');

// load templates
var p5js = loadFile('libraries/p5.js');
var p5minjs = loadFile('libraries/p5.min.js');
var p5domjs = loadFile('libraries/p5.dom.js');
var p5soundjs = loadFile('libraries/p5.sound.js');
var sketchjs = loadFile('templates/sketch.js');
var indexhtml = loadFile('templates/index.html');
var gulpfilejs = loadFile('templates/gulpfile.js');

program
	.command('new <collection>')
	.alias('n')
	.description('Create new p5 collection')
	.action(function(req, opt) {
		var pkg = {
			name: req,
			version: '0.0.0',
			private: true,
			scripts: {
				start: 'gulp'
			},
			'devDependencies': {
				'babel-preset-es2015': '^6.9.0',
				'gulp': '^3.9.1',
				'gulp-babel': '^6.1.2',
				'gulp-connect': '^5.0.0',
				'gulp-rename': '^1.2.2'
			}
		};
		mkdir(req, function() {
			write(req + '/package.json', JSON.stringify(pkg, null, 2) + '\n');
			write(req + '/gulpfile.js', gulpfilejs);
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
	.option('-e, --es6', 'ES6 template')
	.description('Generate a p5 project')
	.action(function(req, opt) {
		mkdir(req, function() {
			if (opt.es6) {
				mkdir(req, function() {
					write(req + '/sketch.es6.js', sketchjs);	
				});
			}
			else {
				write(req + '/sketch.js', sketchjs);
			}
			write(req + '/index.html', indexhtml);
		});
	});

// program
// 	.command('run')
// 	.description('Run run run')
// 	.action(function(req, res) {
// 		console.log('running');
// 		exec('gulp', function(e, stdout, sterr) {
// 			console.log(output);
// 		});
// 	});

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