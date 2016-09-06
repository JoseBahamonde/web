var gulp = require('gulp');
var header = require('gulp-header');
var clean = require('gulp-clean');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var pkg = require('./package.json');

var banner = ['/*!\n',
    ' * Jose Bahamonde - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

gulp.task('minify-css', function() {
    return gulp.src('styles/common.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('styles'))
});

gulp.task('minify-js', function() {
    return gulp.src('scripts/page-utils.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('scripts'))
});

gulp.task('copy', function() {
	gulp.src(
			[ 'node_modules/bootstrap/dist/**/*', '!**/npm.js',
					'!**/bootstrap-theme.*', '!**/*.map' ]).pipe(
			gulp.dest('vendor/bootstrap'));

	gulp.src(
			[ 'node_modules/jquery/dist/jquery.js',
					'node_modules/jquery/dist/jquery.min.js' ]).pipe(
			gulp.dest('vendor/jquery'));

	gulp.src([ 'node_modules/scrollreveal/dist/*.js' ]).pipe(
			gulp.dest('vendor/scrollreveal'));

	gulp.src(
			[ 'node_modules/font-awesome/**',
					'!node_modules/font-awesome/**/*.map',
					'!node_modules/font-awesome/.npmignore',
					'!node_modules/font-awesome/*.txt',
					'!node_modules/font-awesome/*.md',
					'!node_modules/font-awesome/*.json' ]).pipe(
			gulp.dest('vendor/font-awesome'));
})

gulp.task('default', [ 'minify-css', 'minify-js', 'copy' ]);

//gulp.task('package', ['default'], function() {
//	try {
//		gulp.src('./dist', {read: false, force: true}).pipe(clean());
//	} catch (e) { }
//	
//	gulp.src(['./**', '!**/.gitignore', '!./node_modules/'])
//		.pipe(zip('page.zip')).pipe(gulp.dest('dist'));
//});
