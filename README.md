# babel-plugin-optional-require

[![Greenkeeper badge](https://badges.greenkeeper.io/satya164/babel-plugin-optional-require.svg)](https://greenkeeper.io/)

Babel plugin to optionaly require modules. Useful with a bundler like [Metro](https://github.com/facebook/metro) which doesn't support optional `require` statements.

## Usage

Install the plugin:

```sh
yarn add --dev babel-plugin-optional-require
```

Then include it in your `.babelrc`:

```json
{
  "plugins": [
    "optional-require"
  ]
}
```

## Example

To optionally `require` a module, you need to wrap it in `try/catch`:

```js
let a;

try {
  a = require('optional-module');
} catch (e) {
  // handle failure from loading the module
}
```
