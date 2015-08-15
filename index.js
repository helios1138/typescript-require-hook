var ts = require('typescript');
var fs = require('fs');

function compile(filename) {
  return ts.transpile(
    '' + fs.readFileSync(filename),
    {
      target: ts.ScriptTarget.ES5,
      module: ts.ModuleKind.CommonJS
    }
  );
}

module.exports = function () {
  require.extensions['.ts'] = function (m, filename) {
    if (filename.indexOf('node_modules') > -1) {
      m._compile('' + fs.readFileSync(filename), filename);
    }
    else {
      m._compile(compile(filename), filename);
    }
  };
};