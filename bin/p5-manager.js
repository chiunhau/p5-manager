#!/usr/bin/env node

var server = require('../server/server.js');
var generator = require('../generator/generator.js');
var program = require('commander');
var pjson = require('../package.json');

program
	.option('-v, --version', 'Show version of p5-manager', pjson.version)

program
	.command('new <collection>')
	.alias('n')
	.description('Create new p5 collection')
	.action(function(req, opt) {
		generator.collection(req, opt);
	})

program
	.command('generate <project>')
	.alias('g')
	.option('-e, --es6', 'ES6 template')
	.option('-b, --bundle', 'Generate a bundled project')
	.description('Generate a p5 project')
	.action(function(req, opt) {
		generator.project(req, opt);
	})

program
	.command('rename <old_project> <new_project>')
	.alias('mv')
	.description('Rename p5 project <old> <new-name>')
	.action(function(req, opt) {
		generator.rename(req, opt);
	})

program
	.command('server')
	.alias('s')
	.description('Run run run')
	.option('-p, --port [port]', 'HTTP port to start server')
	.action(function(req) {
		server.run(req.port || 5555);
	})

program
	.command('update')
	.alias('u')
	.description('Update libraries to latest version')
	.action(function(req, res) {
		generator.update();
	})


if (program.version) {
	console.log('p5-manager version ' + pjson.version);
}

program
	.parse(process.argv);
