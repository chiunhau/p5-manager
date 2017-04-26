#!/usr/bin/env node
var fs = require( 'fs' );
var server = require('../server/server.js')

fs.readdir('./', function(err, items) {
  console.log(items);
})

server.run(8080);
