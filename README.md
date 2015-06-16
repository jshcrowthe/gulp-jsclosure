gulp-jsclosure [![Build Status](https://travis-ci.org/jshcrowthe/gulp-jsclosure.svg?branch=master)](https://travis-ci.org/jshcrowthe/gulp-jsclosure)
=======================


Javascript closure creator for [gulp](https://github.com/gulpjs/gulp/). `undefined` will always be automatically
appended as last argument of the closure function and will *NOT* be included in the closure call, thus `undefined` will
always be truely `undefined` inside the closure.

```javascript
var closure = require('gulp-jsclosure');
```

## Sample

A simple javascript file (file.js):

```javascript
var a = 1;
var b = 2;
```

#### Options: null

```javascript
;(function(undefined) {
var a = 1;
var b = 1;
})();
```

#### Options: array (e.g. closure(['angular', 'window']))

```javascript
;(function(angular, window, undefined) {
var a = 1;
var b = 2;
})(angular, window);
```

#### Options: object (e.g. closure({angular:'window.angular', window: true}))

```javascript
;(function(angular, window, undefined) {
var a = 1;
var b = 2;
})(window.angular, window);
```

## Example Usage

```javascript
gulp.src('./js/*.js')
  .pipe(closure())
  .pipe(gulp.dest('./dist/'));
```

```javascript
gulp.src('./js/*.js')
  .pipe(closure({ window: true , document: true }))
  .pipe(gulp.dest('./dist/'));
```

```javascript
gulp.src('./js/*.js')
  .pipe(closure(['window', 'document']))
  .pipe(gulp.dest('./dist/'));
```

## License

MIT
