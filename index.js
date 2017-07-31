const path = require('path');
const glob = require('glob');
const safeResolve = require('safe-resolve');

module.exports = (
  { helpers = true, polyfill = true, regenerator = true } = {}
) => ({
  name: 'babel-runtime-external',
  options(opts) {
    let external = [];
    let paths = [];

    if (helpers) {
      paths = paths.concat(
        getFilePaths(path.resolve('node_modules', 'babel-runtime', 'helpers'))
      );
    }

    if (polyfill) {
      paths = paths.concat(
        getFilePaths(path.resolve('node_modules', 'babel-runtime', 'core-js'))
      );
    }

    if (regenerator) {
      paths = paths.concat(
        getFilePaths(
          path.resolve('node_modules', 'babel-runtime', 'regenerator')
        )
      );
    }

    if (typeof opts.external === 'function') {
      external = id => opts.external(id) || paths.includes(id);
    } else {
      external = id =>
        (opts.external || []).map(safeResolve).filter(Boolean).includes(id) ||
        paths.includes(id);
    }

    return Object.assign({}, opts, { external });
  },
});

function getFilePaths(from) {
  return glob.sync('**/*.js', {
    absolute: true,
    cwd: from,
  });
}
