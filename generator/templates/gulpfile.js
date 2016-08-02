var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

var es6Path = './**/*.es6'


gulp.task('babel', function() {
	return gulp.src(es6Path, {base: './'})
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(rename(function(path) {
			path.extname = ".js";

			return path;
		}))
		.pipe(gulp.dest('./'));
})

gulp.task('babel:watch', function() {
	gulp.watch(es6Path, ['babel']);
});

gulp.task('connect', function() {
	connect.server({
		port: 5555
	});
})

gulp.task('default', ['babel', 'babel:watch', 'connect']);