
> p5.js is a JS client-side library for creating graphic and interactive experiences, based on the core principles of Processing.

p5-manager is a p5js template builder and sketch manager. Built for p5js enthusiasts.

## Quick Start

### Step 0: Installation

```bash
$ npm install -g p5-manager
```

### Step 1: Create a new collection

```bash
$ p5 new my_collection && cd my_collection
```

By excuting this command, it will create a collection directory and some p5 libraries to it. See the output log:

```bash
create : my_collection
create : my_collection/libraries
create : my_collection/libraries/p5.js
create : my_collection/libraries/p5.min.js
create : my_collection/libraries/p5.dom.js
create : my_collection/libraries/p5.sound.js
```

### Step 2: Generate a p5 project

```bash
$ p5 generate my_project
```

or a cleaner way:

```bash
$ p5 g my_project
```

This will generate a p5 project folder with basic templates in it:

```bash
create : my_project
create : my_project/sketch.js
create : my_project/index.html
```