/* @flow */

const path = require('path');
const { create } = require('babel-test');
const { toMatchFile } = require('jest-file-snapshot');

expect.extend({ toMatchFile });

const { fixtures } = create({
  plugins: [require.resolve('../index')],
});

fixtures('optional-require', path.join(__dirname, '..', '__fixtures__'));
