const path = require('path');
const glob = require('glob');
const nodeModules = path.resolve('node_modules');

module.exports = (
  { helpers = true, polyfill = true, regenerator = true } = {}
) => ({
  name: 'babel-runtime-external',
  options(opts) {
    let external = [];
    let paths = [];
    let ids = [];

    if (helpers) {
      paths = paths.concat(
        getFilePaths(path.resolve(nodeModules, 'babel-runtime', 'helpers'))
      );
    }

    if (polyfill) {
      paths = paths.concat(
        getFilePaths(path.resolve(nodeModules, 'babel-runtime', 'core-js'))
      );
    }

    if (regenerator) {
      paths = paths.concat(
        getFilePaths(path.resolve(nodeModules, 'babel-runtime', 'regenerator'))
      );
    }

    ids = paths.map(getIdFromPath);

    if (typeof opts.external === 'function') {
      external = id => opts.external(id) || ids.includes(getIdFromPath(id));
    } else {
      external = (opts.external || []).concat(ids);
    }

    return Object.assign({}, opts, { external });
  },
});

function getIdFromPath(from) {
  return from.replace(`${nodeModules}/`, '').replace(path.extname(from), '');
}

function getFilePaths(from) {
  return glob.sync('**/*.js', {
    absolute: true,
    cwd: from,
  });
}
