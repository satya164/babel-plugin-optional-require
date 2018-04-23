# babel-plugin-optional-require

Babel plugin to optionaly require modules. Useful with a bundler like [Metro](https://github.com/facebook/metro) which doesn't support optional `require` statements.

This is primarily useful if you want add an dependency to your library that's optional and you want users to be able to opt-out of it to save bundle size. You can also use it in apps to load configuration files only if they exist.

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

## Options

- `builtins: boolean`: Whether to resolve Node builtins. Default: `false`.
- `blacklist: string[]`: List of modules we assume to be unavailable without resolving. Default: `[]`.
- `whitelist: string[]`: List of modules we assume to be available without resolving. Default: `[]`.

## Example

To optionally `require` a module, you need to wrap it in `try/catch`:

```js
let a;

try {
  a = require('optional-module');
} catch (e) {
  // Handle failure from loading the module
}
```

If the module `optional-module` doesn't exist, the `require` call will be replaced with an IIFE that throws an error, so you can catch it and handle it at runtime. Otherwise, the code is left unchanged.
