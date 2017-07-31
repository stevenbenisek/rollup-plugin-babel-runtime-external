const babelRuntimeExternal = require('./index');

describe('babelRuntimeExternal(options)', () => {
  it('should have a name', () => {
    expect(babelRuntimeExternal().name).toEqual('babel-runtime-external');
  });

  it('should add helpers by default', () => {
    const { external } = babelRuntimeExternal().options({});

    expect(
      external(require.resolve('babel-runtime/helpers/classCallCheck'))
    ).toEqual(true);
  });

  it('should add polyfills by default', () => {
    const { external } = babelRuntimeExternal().options({});

    expect(
      external(require.resolve('babel-runtime/core-js/object/assign'))
    ).toEqual(true);
  });

  it('should add regenerator by default', () => {
    const { external } = babelRuntimeExternal().options({});

    expect(external(require.resolve('babel-runtime/regenerator'))).toEqual(
      true
    );
  });

  it('should handle disabling helpers', () => {
    const { external } = babelRuntimeExternal({
      helpers: false,
    }).options({});

    expect(
      external(require.resolve('babel-runtime/helpers/classCallCheck'))
    ).toEqual(false);
  });

  it('should handle disabling polyfills', () => {
    const { external } = babelRuntimeExternal({
      polyfill: false,
    }).options({});

    expect(
      external(require.resolve('babel-runtime/core-js/object/assign'))
    ).toEqual(false);
  });

  it('should handle disabling regenerator', () => {
    const { external } = babelRuntimeExternal({
      regenerator: false,
    }).options({});

    expect(external(require.resolve('babel-runtime/regenerator'))).toEqual(
      false
    );
  });

  it('should handle extending external function', () => {
    const { external } = babelRuntimeExternal().options({
      external: id => id.includes('module'),
    });

    expect(typeof external).toEqual('function');
    expect(external.length).toEqual(1);
    expect(external('path/to/module')).toEqual(true);
    expect(
      external(require.resolve('babel-runtime/helpers/classCallCheck'))
    ).toEqual(true);
    expect(
      external(require.resolve('babel-runtime/core-js/object/assign'))
    ).toEqual(true);
    expect(external(require.resolve('babel-runtime/regenerator'))).toEqual(
      true
    );
  });

  it('should handle extending external array', () => {
    const { external } = babelRuntimeExternal().options({
      external: ['module'],
    });

    expect(typeof external).toEqual('function');
    expect(external.length).toEqual(1);
    expect(
      external(require.resolve('babel-runtime/helpers/classCallCheck'))
    ).toEqual(true);
    expect(
      external(require.resolve('babel-runtime/core-js/object/assign'))
    ).toEqual(true);
    expect(external(require.resolve('babel-runtime/regenerator'))).toEqual(
      true
    );
  });
});
