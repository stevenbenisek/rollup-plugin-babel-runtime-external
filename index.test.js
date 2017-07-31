const babelRuntimeExternal = require('./index');

describe('babelRuntimeExternal(options)', () => {
  it('should have a name', () => {
    expect(babelRuntimeExternal().name).toEqual('babel-runtime-external');
  });

  it('should add helpers by default', () => {
    expect(babelRuntimeExternal().options({}).external).toContain(
      require.resolve('babel-runtime/helpers/classCallCheck')
    );
  });

  it('should add polyfills by default', () => {
    expect(babelRuntimeExternal().options({}).external).toContain(
      require.resolve('babel-runtime/core-js/object/assign')
    );
  });

  it('should add regenerator by default', () => {
    expect(babelRuntimeExternal().options({}).external).toContain(
      require.resolve('babel-runtime/regenerator')
    );
  });

  it('should handle disabling helpers', () => {
    expect(
      babelRuntimeExternal({
        helpers: false,
      }).options({}).external
    ).not.toContain(require.resolve('babel-runtime/helpers/classCallCheck'));
  });

  it('should handle disabling polyfills', () => {
    expect(
      babelRuntimeExternal({
        polyfill: false,
      }).options({}).external
    ).not.toContain(require.resolve('babel-runtime/core-js/object/assign'));
  });

  it('should handle disabling regenerator', () => {
    expect(
      babelRuntimeExternal({
        regenerator: false,
      }).options({}).external
    ).not.toContain(require.resolve('babel-runtime/regenerator'));
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
    const options = {
      external: ['module'],
    };

    expect(babelRuntimeExternal().options(options).external).toContain(
      require.resolve('module')
    );

    expect(babelRuntimeExternal().options(options).external).toContain(
      require.resolve('babel-runtime/helpers/classCallCheck')
    );

    expect(babelRuntimeExternal().options(options).external).toContain(
      require.resolve('babel-runtime/core-js/object/assign')
    );

    expect(babelRuntimeExternal().options(options).external).toContain(
      require.resolve('babel-runtime/regenerator')
    );
  });
});
