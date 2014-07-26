var gulp = require('gulp');
var mocha = require('gulp-mocha');

var testFiles = ['./test/*.js'];

gulp.task('test', function() {
  return gulp.src(testFiles, {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['test'], function() {
  gulp.watch(testFiles.concat(['./index.js']), ['test']);
});