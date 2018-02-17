var fs = require('fs');
var path = require('path');
var request = require('request');
var download = require('download');

var templates = {
	sketchjs: loadFile('templates/sketch.js'),
	indexhtml: loadFile('templates/index.html'),
	indexhtmlb: loadFile('templates/index-bundle.html')
}

var libraries = {
	p5js: loadFile('libraries/p5.js'),
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
			createLibraries(collection);
		});
	},
	project: function(project, opt) {

		templates.indexhtml = templates.indexhtml.replace('{{project-title}}',
			project);
		templates.indexhtmlb = templates.indexhtmlb.replace('{{project-title}}',
			project);

		mkdir(project, function() {
			if (opt.bundle) {
				createLibraries(project);
				write(project + '/sketch.js', templates.sketchjs);
				write(project + '/index.html', templates.indexhtmlb);
			}
			else if (opt.template) {
				// template info format: owner/repo@branch
				let templateInfo = opt.template;
				let regex = /\w+\/\w+(\@\w+)?/i
				if (!regex.test(templateInfo)) {
					console.log("Please specify owner and repo !");
					fs.rmdirSync(project);
					return;
				}
				let owner = templateInfo.split("/")[0];
				let repo = templateInfo.split("/")[1].split("@")[0];
				let branch = templateInfo.split("/")[1].split("@")[1];
				branch = branch ? branch : 'master'; // default value for branch
				downloadRemoteTemplate(project, owner, repo, branch);
			}
			else {
				var p5rc = JSON.parse(fs.readFileSync('.p5rc', 'utf-8'));
				p5rc.projects.push(project);
				write('.p5rc', JSON.stringify(p5rc, null, 2));

				if (opt.es6) {
					write(project + '/sketch.es6', templates.sketchjs);
				} else {
					write(project + '/sketch.js', templates.sketchjs);
				}
				write(project + '/index.html', templates.indexhtml);
			}

		});
	},

	// Added by Torben Brams
	// 2017-09-31
	// Easier to manage renaming inside collections
	//
	rename: function(oldName, newName) {

		// update the hidden file
		var obj = JSON.parse(fs.readFileSync('.p5rc', 'utf-8'));
		let found = false;

		for (var i = 0; i < obj.projects.length; i++) {
			if (obj.projects[i] == oldName) {
				obj.projects[i] = newName;
				found = true;
				break;
			}
		}
		if (found) {
			write('.p5rc', JSON.stringify(obj, null, 2));

			// rename the directory name
			try {
				fs.renameSync(oldName, newName);

				// Now, update the title tag in the index.html file
				let htmLines = fs.readFileSync(newName + '/index.html', 'utf-8').split(
					'\n');

				for (var i = 0; i < htmLines.length; i++) {
					let line = htmLines[i];
					let start = line.search('<title>');
					if (start > 0) {
						let stop = line.search('</title>');
						let newLine =
							line.substr(0, start + 7) +
							newName +
							line.substr(stop, line.length);
						htmLines[i] = newLine;
					}
				}
				write(newName + '/index.html', htmLines.join('\n'));

				console.log(`Project ${oldName} renamed to ${newName} `);
			} catch (err) {
				console.log('Could not rename: ' + err);
			}

		} else {
			console.log(`Project ${oldName} not found`);
		}
	},


	update: function() {
		var option = {
			url: 'https://api.github.com/repos/processing/p5.js/releases/latest',
			headers: {
				'User-Agent': 'chiunhau/p5-manager'
			}
		}

		request(option, function(error, res, body) {
			// get latest release tag
			var obj = JSON.parse(body);
			console.log('The latest p5.js release is version ' + obj.tag_name);

			download(libPath(obj.tag_name, 'p5.js'), 'libraries').then(() => {
				console.log('   \033[36mupdated\033[0m : ' + 'p5.js');
			});
			download(libPath(obj.tag_name, 'p5.dom.js'), 'libraries').then(() => {
				console.log('   \033[36mupdated\033[0m : ' + 'p5.dom.js');
			});
			download(libPath(obj.tag_name, 'p5.sound.js'), 'libraries').then(() => {
				console.log('   \033[36mupdated\033[0m : ' + 'p5.sound.js');
			});
		});
	}
}

function libPath(tag, filename) {
	var fullpath = 'https://github.com/processing/p5.js/releases/download/' + tag +
		'/' + filename;
	console.log('   \033[36mdownloading\033[0m : ' + filename + '...');

	return fullpath
}

function createLibraries(dirName) {
	mkdir(dirName + '/libraries', function() {
		write(dirName + '/libraries/p5.js', libraries.p5js);
		write(dirName + '/libraries/p5.sound.js', libraries.p5soundjs);
		write(dirName + '/libraries/p5.dom.js', libraries.p5domjs);
	});
}

function downloadRemoteTemplate(project, owner, repo, branch) {
	var url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}`;
	// using recursive to get all files in all sub directories
	url += "?recursive=1";
	// auth
	url += "&client_id=c136f0097a93110057d3";
	url += "&client_secret=b4f537a3dc4fa4003bd13e01eec62b3f1111d83e";
	var option = {
		url: url,
		headers: {
			'User-Agent': 'chiunhau/p5-manager'
		}
	}
	request(option, function(error, res, body) {
		if (error) {
			console.log("Error while downloading the template");
			console.log("Error: " + error);
			return;
		}
		else {
			if (res.statusCode == 200) {
				var data = JSON.parse(body);
				var items = data.tree;
				for(var i = 0; i < items.length; i++) {
					let currentItem = items[i];
					if (currentItem.type == 'tree') {
						// this is a directory
						mkdir(project + '/' + currentItem.path);
					}
					else {
						var currentFilePath = currentItem.path;
						var currentFileURL = currentItem.url + "?client_id=c136f0097a93110057d3&client_secret=b4f537a3dc4fa4003bd13e01eec62b3f1111d83e";
						downloadFile(project, currentFilePath, currentFileURL);
					}
				}
			}
			else {
				console.log("Error while downloading the template");
				console.log("Response code: " + res.statusCode);
			}
		}
	});
}

function downloadFile(project, path, url) {
	var option = {
		url: url,
		headers: {
			'User-Agent': 'chiunhau/p5-manager'
		}
	}
	request(option, function(err, resp, json) {
		if (err) {
			console.log("Error while downloading the template");
			console.log("Error: " + err);
			return;
		}
		else {
			var fileEncodedContent = JSON.parse(json).content;
			if (!fileEncodedContent) {
				console.log("Error while downloading the template");
				console.log("Undefined content on file : " + path);
				return;
			}
			var fileContent = new Buffer(fileEncodedContent, 'base64');
					fileContent = fileContent.toString('ascii');
			write(project + '/' + path, fileContent);
		}
	});
}

// the following code are taken from https://github.com/expressjs/generator

function loadFile(name) {
	return fs.readFileSync(path.join(__dirname, name), 'utf-8');
}

function write(path, str, mode) {
	fs.writeFileSync(path, str, {
		mode: mode || 0666
	});
	console.log('   \x1b[36mcreate\x1b[0m : ' + path);
}

function mkdir(path, fn) {
	fs.mkdir(path, 0755, function(err) {
		if (err) throw err;
		console.log('   \033[36mcreate\033[0m : ' + path);
		fn && fn();
	});
}

module.exports = generator;
