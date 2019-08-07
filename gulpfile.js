var gulp = require('gulp');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var zip = require('gulp-zip');
var del = require('del');
var pkg = require('./package.json');

var banner = ['/*!\n',
    ' * Jose Bahamonde - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

gulp.task('clean', function() {
	del([ 'dist/**' ]);
});

gulp.task('minify-css', function() {
    return gulp.src('src/styles/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('dist/page/styles'))
});

gulp.task('copy', function() {
	gulp.src(
            [ 'node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map' ])
            .pipe(gulp.dest('dist/page/vendor/bootstrap'));

	gulp.src(
			[ 'node_modules/@fortawesome/fontawesome-free/**',
					'!node_modules/@fortawesome/fontawesome-free/**/*.map',
					'!node_modules/@fortawesome/fontawesome-free/.npmignore',
					'!node_modules/@fortawesome/fontawesome-free/*.txt',
					'!node_modules/@fortawesome/fontawesome-free/*.md',
                    '!node_modules/@fortawesome/fontawesome-free/*.json' ])
            .pipe(gulp.dest('dist/page/vendor/font-awesome'));
})

gulp.task('default', [ 'minify-css', 'copy' ]);

gulp.task('copy-dist', ['default'], function() {
	gulp.src([ 'src/images/**' ]).pipe(gulp.dest('dist/page/images'));
    gulp.src([ 'src/fonts/**' ]).pipe(gulp.dest('dist/page/fonts'));
	gulp.src([ 'src/index.html' ]).pipe(gulp.dest('dist/page'));
    gulp.src([ 'src/favicon.ico' ]).pipe(gulp.dest('dist/page'));
});

gulp.task('package', ['copy-dist'], function() {
	gulp.src(['./dist/page/**']).pipe(zip('page.zip')).pipe(gulp.dest('dist'));
});