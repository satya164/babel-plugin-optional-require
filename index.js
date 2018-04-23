/* @flow */

const dirname = require('path').dirname;
const resolve = require('resolve-from');
const isBuiltin = require('is-builtin-module');

module.exports = function rewire(babel /*: any */) {
  const t = babel.types;

  return {
    visitor: {
      TryStatement(path /*: any */, state /*: any */) {
        path.get('block').traverse({
          CallExpression(p) {
            if (
              p.node.callee.name !== 'require' ||
              p.node.arguments.length !== 1
            ) {
              return;
            }

            const {
              builtins = false,
              blacklist = [],
              whitelist = [],
            } = state.opts;

            const name = p.get('arguments')[0].evaluate().value;

            if (typeof name !== 'string') {
              return;
            }

            if (whitelist.includes(name)) {
              return;
            }

            const cwd =
              state.file && state.file.opts && state.file.opts.filename
                ? dirname(state.file.opts.filename)
                : process.cwd();

            try {
              if (blacklist.includes(name)) {
                throw new Error(`Cannot find module '${name}'`);
              }

              if (builtins !== true && isBuiltin(name)) {
                throw new Error(`Cannot resolve builtin module '${name}'`);
              } else {
                resolve(cwd, name);
              }
            } catch (e) {
              p.replaceWith(
                t.throwStatement(
                  t.newExpression(t.identifier('Error'), [
                    t.stringLiteral(e.message),
                  ])
                )
              );
            }
          },
        });
      },
    },
  };
};
