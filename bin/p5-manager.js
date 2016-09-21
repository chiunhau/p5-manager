#!/usr/bin/env node

var server = require('../server/server.js');
var generator = require('../generator/generator.js');
var program = require('commander');

program
	.command('new <collection>')
	.alias('n')
	.description('Create new p5 collection')
	.action(function(req, opt) {
		generator.collection(req, opt);
	});

program
	.command('generate <project>')
	.alias('g')
	.option('-e, --es6', 'ES6 template')
	.option('-b, --bundle', 'Generate a bundled project')
	.description('Generate a p5 project')
	.action(function(req, opt) {
		generator.project(req, opt);
	});

program
	.command('server')
	.alias('s')
	.description('Run run run')
	.action(function(req, res) {
		server.run(5555);
	});

program
  .command('update')
  .alias('u')
  .description('Update libraries to latest version')
  .action(function(req, res) {
    generator.update();
  })

program.parse(process.argv);
