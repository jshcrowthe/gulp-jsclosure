gulp-jsclosure [![Build Status](https://travis-ci.org/jshcrowthe/gulp-jsClosure.svg?branch=master)](https://travis-ci.org/jshcrowthe/gulp-jsClosure)
=======================


Javascript closure creator for [gulp](https://github.com/gulpjs/gulp/).

```javascript
var closure = require('gulp-jsclosure');
```

## Examples

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
