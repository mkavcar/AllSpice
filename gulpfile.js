var gulp = require('gulp'),
	concat = require('gulp-concat'),
    gulpSequence = require('gulp-sequence'),
	livereload = require('gulp-livereload'),
	minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch'),
	sequence = require('gulp-watch-sequence'),
    del = require('del'),
    angularTemplates = require('gulp-angular-templates');


var paths = {
	js: [
        'src/app/app.module.js',
		'src/app/**/*.js'
	],
    html: [
		'src/**/*.html',
        '!src/index.html'
	],
	css: [
		'src/content/*.css'
	]	
}

//clean dist folder`
gulp.task('clean', function () {
  return del(['dist/**/*']);
});

//
gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(angularTemplates({ module: 'allSpiceApp'}))
        .pipe(gulp.src(paths.js), {
            passthrough: true,
            root: 'app/',
            standAlone: false})
        .pipe(concat('app.js'))
		//.pipe(uglify())
        .pipe(gulp.dest('dist/'));
});


//bundle & minify JS 
gulp.task('js', function() {
	gulp.src(paths.js)
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/'));
});


//execute
gulp.task('default', 
    gulpSequence('clean', 'js'));