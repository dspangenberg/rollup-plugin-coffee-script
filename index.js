var coffeescript = require('coffee-react');
var createFilter = require('rollup-pluginutils').createFilter;
var objectAssign = require('object-assign');
var extname = require('path').extname;

module.exports = function coffee(options) {
  options = objectAssign({}, options || {}, { sourceMap: true, bare: true, extensions: ['.coffee','.cjsx'] });

  var filter = createFilter(options.include, options.exclude);
  var extensions = options.extensions;
  delete options.extensions;
  delete options.include;
  delete options.exclude;

  return {
    transform: function(code, id) {
      if (!filter(id)) return null;
      if (extensions.indexOf(extname(id)) === -1) return null;

      var output = coffeescript.compile(code, options);

      return {
        code: output.js,
        map: output.sourceMap
      };
    }
  };
};
