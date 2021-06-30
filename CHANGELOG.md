### 1.4.0

- Bump p5.js to v1.4.0 with p5.sound.js to v1.0.1
- Refactor: rewrtie GUI with Svelte + Rollup as they are much simpler than Vue + Webpack
- BREAKING CHANGE: remove Babel live compile as most browsers now support ES6 out-of-the-box
- BREAKING CHANGE: remove Split View Mode

### 1.3.1

- Fix decade-old issues and bump p5.js to 1.3.1

### 0.4.2

- Update p5.js libraries.

### 0.4.1

- Resolved issue #32.

### 0.4.0

- Support live reload. (Default when running `p5 server`)
- Fix GUI margin-left bug.
- Add new command `p5 rename PROJECT_NAME NEW_PROJECT_NAME` to rename a project.
- Add favicon for GUI mode.

### 0.3.0

- Rebuild with Vue.js and vue-router.
- Totally client side rendering.
- New split view url format introduced.
- Add developer friendly scripts (see 'demo' folder).

### 0.2.11

- Add brand new "split view" feature.
- Add Vue.js dependency.

### 0.2.10

- Add customize port option for `p5 server`.

### 0.2.9

- Add project title animation.
- Add new window button for each project.

### 0.2.8

- Add `p5 -v` to show the version of p5-manager.
- Update p5.js to version `0.5.4`.

### 0.2.7

- Include project name to HTML title.
- Templates indentation issue fixed.
- Add `.editorconfig`.
- Add `margin-left` to sketch iframe in GUI.

### 0.2.6

- Now able to generate standalone project using `p5 generate --bundle PROJECT_NAME` or `p5 g -b PROJECT_NAME`.
