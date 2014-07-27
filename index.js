var through = require("through2");
var gutil = require("gulp-util");
var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-jsclosure';

module.exports = function (options) {
  var newline = gutil.linefeed;
  var params = [];
  var detectGlobals;
  var getGlobals;
  var defaultGlobals;
  var defaultGlobalsObj;

  if (Array.isArray(options)) {
    params = options;
    detectGlobals = false;
  } else if (typeof options === "object") {
    if (Array.isArray(options.params)) params = options.params;
    detectGlobals = options.detectGlobals || false;
  }

  var arrToObj = function(container, value) {
    if (typeof container !== 'object') container = {};
    container[value] = true;
    return container;
  };

  /**
   * This function will take an array of params to be passed into the closure
   * it will build the javascript closure around the file and it will pass the file
   * down the chain.
   * 
   * @param  {Boolean} detectGlobals [Flag to determine if function should smart build closure from existing globals]
   * @param  {Array} paramsArray [An array of parameters to be passed into the closure]
   * @return {Function} []
   */
   var buildClosure = function(detectGlobals, paramsArray) {
    /**
     * This function is returned by buildClosure and is the meat of the entire application
     * It will verify that the file being passed into the function is A) not null and B) 
     * not a stream. It will then build around the contents a standard javascript closure
     * with the parameters provided by buildClosure (if any).
     * @param  {Object}   file     [This is the file that we will be building our closure around]
     * @param  {String}   encoding [Encoding type of the file param]
     * @param  {Function} callback [This function invokes the callback in order to continue the stream flow]
     * @return {Function} [Return the value of callback()]
     */
    var paramExistsInFile = function(fileContents) {
      return function(value) {
        var regex = new RegExp(value + '(?!\\w)');
        return regex.test(fileContents);
      };
    };

    var paramDoesntExist = function(value) {
      for (var i = 0, limit = paramsArray.length; i < limit; i++) {
        if (paramsArray[i] === value) return false;
      }
      return true;
    };
     return function(file, encoding, callback) {
      if (file.isNull()) {
        this.push(file);
        return callback();        
      }

      if (file.isStream()) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'gulp-jsclosure: Streaming not supported'));
        return callback();
      }

      if (file.isBuffer()) {
        if (detectGlobals) {
          var getGlobals = 'var detectedVars = []; for (var variable in this) { if (this.hasOwnProperty(variable)) { detectedVars.push(variable); } } return detectedVars;';
          var inputFileGlobals;
          try {
            inputFileGlobals = new Function(String(file.contents) + getGlobals)();
          } catch (e) {
            inputFileGlobals = [];
            console.log(e.filename);
          }
          paramsArray = paramsArray.concat(inputFileGlobals.filter(paramExistsInFile(String(file.contents))).filter(paramDoesntExist));
        }
        file.contents = Buffer.concat([
          new Buffer(";(function(" + paramsArray.join(", ") + ") {" + newline),
          file.contents,
          new Buffer(newline + "})(" + paramsArray.join(", ") + ");")
          ]);
      }

      this.push(file);
      return callback();
    };
  };
  return through.obj(buildClosure(detectGlobals, params));
};
