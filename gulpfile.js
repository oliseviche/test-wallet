'use strict'

let gulp = require('gulp');
let connect = require('gulp-connect');
let fs = require("fs");
let browserify = require("browserify");
let babel = require("gulp-babel");
let source = require('vinyl-source-stream');
let serveStatic = require('serve-static');

gulp.task('babel', function() {
	browserify("src/js/main.js", {
		paths: ['src/js/'],
		extensions: ['.jsx']
	})
	.transform("babelify", {
		presets: [
			'es2015',
			'stage-2',
			'react'
		]
	})
	.bundle()
	.pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
	gulp.src(['src/*.html', 'src/**/*.css', 'src/img*/**', 'src/fonts*/**'])
		.pipe(gulp.dest('dist'));
});

gulp.task('connect', function() {
	connect.server({
		port: 8001,
		root: 'dist',
		debug: true,
		middleware: function(connect, opt) {
			return [
				serveStatic('dist/')
			];
		}
	});
});

gulp.task('default', ['babel', 'html', 'connect']);
gulp.task('build', ['babel', 'html']);