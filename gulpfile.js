var gulp = require('gulp');

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
	gulp.src(
			[ 'node_modules/bootstrap/dist/**/*', '!**/npm.js',
					'!**/bootstrap-theme.*', '!**/*.map' ]).pipe(
			gulp.dest('vendor/bootstrap'))

	gulp.src(
			[ 'node_modules/jquery/dist/jquery.js',
					'node_modules/jquery/dist/jquery.min.js' ]).pipe(
			gulp.dest('vendor/jquery'))

	gulp.src(
			[ 'node_modules/font-awesome/**',
					'!node_modules/font-awesome/**/*.map',
					'!node_modules/font-awesome/.npmignore',
					'!node_modules/font-awesome/*.txt',
					'!node_modules/font-awesome/*.md',
					'!node_modules/font-awesome/*.json' ]).pipe(
			gulp.dest('vendor/font-awesome'))
})

// Run everything
gulp.task('default', [ 'copy' ]);