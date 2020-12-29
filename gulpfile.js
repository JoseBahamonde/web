var gulp = require('gulp');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var zip = require('gulp-zip');
var del = require('del');
var pkg = require('./package.json');
var purify = require('gulp-purifycss');
var replace = require('gulp-replace');
const { dest } = require('gulp');

var banner = ['/*!\n',
    ' * Jose Bahamonde - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright ' + (new Date()).getFullYear(), ' - <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

gulp.task('clean', gulp.series((cb) => {
        del(['dist/**']);
        cb();
    }));

gulp.task('minify-css', gulp.series(() => gulp.src('src/styles/*.css')
        .pipe(purify(['src/index.html']))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('dist/page/styles'))));

gulp.task('copy', gulp.series((cb) => {
    gulp.src([
        'node_modules/@fortawesome/fontawesome-free/**/*.svg',
        'node_modules/@fortawesome/fontawesome-free/**/*.eot',
        'node_modules/@fortawesome/fontawesome-free/**/*.ttf',
        'node_modules/@fortawesome/fontawesome-free/**/*.woff',
        'node_modules/@fortawesome/fontawesome-free/**/*.woff2'
    ]).pipe(gulp.dest('dist/page/vendor/fontawesome'));
    gulp
        .src(['node_modules/@fortawesome/fontawesome-free/css/*.css'])
        .pipe(purify(['src/index.html']))
        .pipe(gulp.dest('dist/page/vendor/fontawesome/css'))
    cb();
}));

gulp.task('default', gulp.series('minify-css', 'copy'));

gulp.task('build', gulp.series('default', (cb) => {
        gulp.src(['src/images/**']).pipe(gulp.dest('dist/page/images'));
        gulp.src(['src/fonts/**']).pipe(gulp.dest('dist/page/fonts'));
        gulp
            .src(['src/index.html'])
            .pipe(replace(/styles\/([^"]*)\.css/g, 'styles/$1.min.css'))
            .pipe(replace(/\.\.\/node_modules\/@fortawesome\/fontawesome-free/g, 'vendor/fontawesome'))
            .pipe(gulp.dest('dist/page'));
        gulp.src(['src/favicon.ico']).pipe(gulp.dest('dist/page'));
        gulp.src(['src/favicon*.png']).pipe(gulp.dest('dist/page'));
        cb();
    }));

gulp.task('package', gulp.series('build', (cb) => {
        gulp
            .src(['./dist/page/**'])
            .pipe(zip('page.zip'))
            .pipe(gulp.dest('dist'));
        cb();
    }));