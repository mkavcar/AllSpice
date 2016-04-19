var gulp = require('gulp'),
	concat = require('gulp-concat'),
    gulpSequence = require('gulp-sequence'),
	livereload = require('gulp-livereload'),
	minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch'),
	sequence = require('gulp-watch-sequence'),
    del = require('del'),
    angularTemplatecache = require('gulp-angular-templatecache'),
    htmlmin = require('gulp-htmlmin');

// Path settings for Gulp
var clientApp = './src/app/';
var config = {
    html: clientApp + '**/*.html',
    js: [
        clientApp + 'app.module.js',
		clientApp + '**/*.js'
	],
    css: './src/content/*.css',
    templateCache: {
        file: 'templates.js',
        options: {
            module: 'allSpiceApp',
            root: 'app/',
            standAlone: false
        }
    },
    output: 'app.js',
    dest: './dist/'
};

//bundle & minify JS 
gulp.task('js', function() {
	gulp.src(config.js)
		.pipe(concat(config.output))
		.pipe(uglify())
		.pipe(gulp.dest(config.dest));
});

//create angular template cache
gulp.task('templatecache', function() {
    return gulp
        .src(config.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.dest));
});

//merge app.js with templates.js
gulp.task('merge', function() {
    return gulp
        .src([config.dest + config.output, config.dest + config.templateCache.file])
        .pipe(concat(config.output))
        .pipe(gulp.dest(config.dest));
});

//delete templates.js
gulp.task('clean', function () {
  return del(config.dest + config.templateCache.file);
});

//css
gulp.task('css', function() {
   gulp.src(config.css)
    .pipe(minifyCSS()) 
    .pipe(gulp.dest('dist/'));
});


//execute
gulp.task('default', 
    gulpSequence('js', 'templatecache', 'merge', 'css', 'clean'));