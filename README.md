 [![npm version](https://badge.fury.io/js/p5-manager.svg)](https://badge.fury.io/js/p5-manager)

p5-manager is a [p5js](https://github.com/processing/p5.js/) template builder and sketch manager. Built for p5js enthusiasts.

> p5.js is a JS client-side library for creating graphic and interactive experiences, based on the core principles of Processing.

## Quick Start

### Step 0: Install p5-manager CLI tool globally from [npm](https://www.npmjs.com/package/p5-manager).

```bash
$ npm install -g p5-manager
```

### Step 1: Initialize a new collection

```bash
$ p5 new my_collection && cd my_collection
$ npm install
```

By excuting this command, it will create a collection directory and some p5 libraries to it. See the output log:

```bash
# create : my_collection
# create : my_collection/package.json
# create : my_collection/gulpfile.js
# create : my_collection/libraries
# ...
```

### Step 2: Generate a p5 project

```bash
$ p5 generate my_project
```
Or simply...
```
$ p5 g my_project
```

This will generate a p5 project folder with some templates in it:

```bash
# create : my_project
# create : my_project/sketch.js
# create : my_project/index.html
```

### Step 3: Start the server and do your magic!

Now edit your sketch.js and go to localhost:5555, p5-manager will do the rest.

```bash
npm start
```

## Options
### Using Babel ES6

Simply add a flag after the ```p5 generate <project>``` command. Then you'll have a `sketch.es6.js` file in the directory. Those files with `.es6.js` extension would be automatically compiled to `.js` everytime you save them.

```bash 
p5 g my_project_es6 --es6
```

##WIP
- Get rid of gulp
- GUI for switching between sketches
- Support Coffeescript
- Any idea? Open an [issue](https://github.com/chiunhau/p5-manager/issues)!

