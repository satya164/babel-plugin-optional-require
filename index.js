/* @flow */

const resolve = require('resolve-cwd');

module.exports = function rewire(babel) {
  const t = babel.types;

  return {
    visitor: {
      TryStatement(path) {
        path.get('block').traverse({
          CallExpression(p) {
            if (
              p.node.callee.name !== 'require' ||
              p.node.arguments.length !== 1
            ) {
              return;
            }

            const name = p.node.arguments[0].value;

            try {
              resolve(name);
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
