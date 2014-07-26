(function() {
  var fs = require('fs');
  var expect = require('chai').expect;
  var closure = require('../');
  var gutil = require('gulp-util');
  var Stream = require('stream');

  describe('gulp-jsclosure Test Suite:', function() {
    describe('Testing Null Options Param:', function() {
      // Setup stream
      beforeEach(function() {
        rawFile = fs.readFileSync('./test/inputFiles/in.js', 'utf8');
        testFile = new gutil.File({
          contents: new Buffer(rawFile)
        });
        outFile = fs.readFileSync('./test/outputFiles/1.js', 'utf8');
        expectedFile = new gutil.File({
          contents: new Buffer(outFile)
        });
      });

      // Tests
      it('Return file with closure (no params) - closure()', function (done) {
        var stream = closure();
        stream.on('data', function(processedFile) {
          expect(String(processedFile.contents)).to.equal(String(expectedFile.contents));
        });
        stream.write(testFile);
        stream.end();
        done();
      });

      it('Return file with closure (no params) - closure({})', function (done) {
        var stream = closure({});
        stream.on('data', function(processedFile) {
          expect(String(processedFile.contents)).to.equal(String(expectedFile.contents));
        });
        stream.write(testFile);
        stream.end();
        done();
      });

      it('Return file with closure (no params) - closure([])', function (done) {
        var stream = closure({});
        stream.on('data', function(processedFile) {
          expect(String(processedFile.contents)).to.equal(String(expectedFile.contents));
        });
        stream.write(testFile);
        stream.end();
        done();
      });
    });
    describe('Testing Array type Options Param:', function() {
      // Setup stream
      beforeEach(function() {
        rawFile = fs.readFileSync('./test/inputFiles/in.js', 'utf8');
        testFile = new gutil.File({
          contents: new Buffer(rawFile)
        });
      });

      // Tests
      it('Return file with closure (1 param) - closure(["window"])', function (done) {
        var stream = closure(['window']);
        var outFile = fs.readFileSync('./test/outputFiles/2.js', 'utf8');
        var expectedFile = new gutil.File({
          contents: new Buffer(outFile)
        });
        stream.on('data', function(processedFile) {
          expect(String(processedFile.contents)).to.equal(String(expectedFile.contents));
        });
        stream.write(testFile);
        stream.end();
        done();
      });

      it('Return file with closure (2 params) - closure(["window", "document"])', function (done) {
        var stream = closure(['window', 'document']);
        var outFile = fs.readFileSync('./test/outputFiles/3.js', 'utf8');
        var expectedFile = new gutil.File({
          contents: new Buffer(outFile)
        });
        stream.on('data', function(processedFile) {
          expect(String(processedFile.contents)).to.equal(String(expectedFile.contents));
        });
        stream.write(testFile);
        stream.end();
        done();
      });
    });
    describe('Testing Object type Options Param:', function() {
      // Setup stream
      beforeEach(function() {
        rawFile = fs.readFileSync('./test/inputFiles/in.js', 'utf8');
        testFile = new gutil.File({
          contents: new Buffer(rawFile)
        });
      });

      // Tests
      it('Return file with closure (1 param) - closure({window:true})', function (done) {
        var stream = closure({window:true});
        var outFile = fs.readFileSync('./test/outputFiles/2.js', 'utf8');
        var expectedFile = new gutil.File({
          contents: new Buffer(outFile)
        });
        stream.on('data', function(processedFile) {
          expect(String(processedFile.contents)).to.equal(String(expectedFile.contents));
        });
        stream.write(testFile);
        stream.end();
        done();
      });

      it('Return file with closure (2 params) - closure({window:true, document:true})', function (done) {
        var stream = closure({window:true, document:true});
        var outFile = fs.readFileSync('./test/outputFiles/3.js', 'utf8');
        var expectedFile = new gutil.File({
          contents: new Buffer(outFile)
        });
        stream.on('data', function(processedFile) {
          expect(String(processedFile.contents)).to.equal(String(expectedFile.contents));
        });
        stream.write(testFile);
        stream.end();
        done();
      });
    });
    describe('Testing Stream/Null Handling:', function() {
      beforeEach(function() {
        stream = closure();
      });
      it('Null input should not have changed', function() {
        var nullFile = new gutil.File({
          contents: null
        });
        stream.on('data', function(processedFile) {
          expect(String(processedFile.contents)).to.equal(String(nullFile.contents));
        });
        stream.write(nullFile);
      });
      it('Stream input should emit error', function() {
        var inStream = new gutil.File({
          contents: new Stream()
        });
        stream.on('error', function(error) {
          expect(error.message).to.equal('gulp-jsclosure: Streaming not supported');
        });
        stream.write(inStream);
      });
      afterEach(function() {
        stream.end();
      });
    });
  });
})();