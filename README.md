# rollup-plugin-babel-runtime-external

> [Rollup](https://rollupjs.org/) plugin to automatically exclude [babel-runtime](https://babeljs.io/docs/plugins/transform-runtime/) from your bundle.

## Install

```bash
npm install --save-dev rollup-plugin-babel-runtime-external
```

## Usage

##### Example `rollup.config.js`

```js
import babelRuntimeExternal from 'rollup-plugin-babel-runtime-external';

export default {
  entry: 'index.js',
  plugins: [
    babelRuntimeExternal(),
  ],
};
```

##### Example `rollup.config.js` with options

```js
import babelRuntimeExternal from 'rollup-plugin-babel-runtime-external';

export default {
  entry: 'index.js',
  plugins: [
    babelRuntimeExternal({
      helpers: false,
      polyfill: true,
      regenerator: false,
    }),
  ],
};
```

##### Example `rollup.config.js` with [external](https://github.com/rollup/rollup/wiki/JavaScript-API#external)

`rollup-plugin-babel-runtime-external` does not overwrite the [external](https://github.com/rollup/rollup/wiki/JavaScript-API#external) option. The two can happily coexist.

```js
import babelRuntimeExternal from 'rollup-plugin-babel-runtime-external';

export default {
  entry: 'index.js',
  external: ['react'],
  plugins: [
    babelRuntimeExternal(),
  ],
};
```

### Options

#### `helpers`

`boolean`: defaults to `true`.

#### `polyfill`

`boolean`: defaults to `true`.

#### `regenerator`

`boolean`: defaults to `true`.