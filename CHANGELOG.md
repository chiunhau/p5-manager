### 0.4.4

- replace all p5.js & p5.sound.js libraries with latest versions (v1.0.0 & v0.3.12)

### 0.4.3
- replace all p5.js & p5.sound.js libraries with latest versions (v0.10.2 & v0.3.11)
- remove all p5.dom.js libraries (merged into p5.js core as of v0.10.0)
- remove all p5.dom.js features in generate.js
- remove all p5.dom.js references in all index.html and index-bundle.html files
- remove all p5.dom.js references in README.md

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
