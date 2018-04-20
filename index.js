/* @flow */

const dirname = require('path').dirname;
const resolve = require('resolve-from');

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

            const node = p.node.arguments[0];

            let name;

            if (t.isStringLiteral(node)) {
              name = node.value;
            } else if (t.isTemplateLiteral(node) && node.quasis.length === 1) {
              name = node.quasis[0].value.cooked;
            }

            if (typeof name !== 'string') {
              return;
            }

            const cwd =
              state.file && state.file.opts && state.file.opts.filename
                ? dirname(state.file.opts.filename)
                : process.cwd();

            try {
              resolve(cwd, name);
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
