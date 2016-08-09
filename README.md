 [![npm version](https://badge.fury.io/js/p5-manager.svg)](https://badge.fury.io/js/p5-manager)

p5-manager is a [p5js](https://github.com/processing/p5.js/) template builder and sketch manager. Built for p5js enthusiasts.

> p5.js is a JS client-side library for creating graphic and interactive experiences, based on the core principles of Processing.

## Quick Start

### Step 0: Install from npm

```bash
$ npm install -g p5-manager
```

### Step 1: Initialize a new collection

```bash
$ p5 new my_collection && cd my_collection
```

By excuting this command, it will create a collection directory and some p5 libraries to it. See the output log:

```bash
# create : my_collection
# create : my_collection/libraries
# create : my_collection/libraries/p5.js
# ...
```

### Step 2: Generate a p5 project

```bash
$ p5 generate my_project
# or...
$ p5 g my_project
```

This will generate a p5 project folder with some templates in it. (Notice: all projects can't live outside a collection, make sure you are running this command in a collection directory.)

```bash
# create : my_project
# create : my_project/sketch.js
# create : my_project/index.html
```

### Step 3: Start the server and do your magic!

```bash
$ p5 server
# or...
$ p5 s
```

Now edit your sketch.js and go to localhost:5555/PROJECT_NAME, then p5-manager will do the rest. (Notice: you should run `p5 server` in a collection directory, instead of a project diretory)

## Static mode v.s GUI mode
There are two ways to get access to your sketch. One is via public path, ex: `localhost:5555/demo1/index.html`. The other way is GUI mode, simply go to: `localhost:5555/demo1` to have fun with our GUI panel.

## Advanced
### Using Babel ES6

Simply add a flag after the `p5 generate` command. Then you'll have a `sketch.es6` file in the project. Those files with `.es6` extension would be automatically compiled to `.js` to the same directory everytime you save them.

```bash
$ p5 g my_project_es6 --es6
```

### What is .p5rc
The main purpose of `.p5rc` is to track projects in the collection. Once you generate a project with command `p5 generate`, it will be utomatically. added to `.p5rc`. Projects listed in the `.p5rc` file would be servered in the GUI mode.

##WIP
- GUI for switching between projects, for demo ^^
- Support Coffeescript
- Any idea? Open an [issue](https://github.com/chiunhau/p5-manager/issues)!

## About this project
I'm a graphic design student who use p5js a lot so I need something to help me develop, manage or demo my p5js projects more efficiently. That's why p5-manager was made.

Inspired by [kadamwhite/p5-cli](https://github.com/kadamwhite/p5-cli) and [express/generator](https://github.com/expressjs/generator).

Distributed under the MIT license.
