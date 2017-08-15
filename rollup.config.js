'use strict';

const babel = require('rollup-plugin-babel');
const es2015rollup = require('babel-preset-es2015-rollup');
const reactPreset = require('babel-preset-react');
const nodeResolve = require('rollup-plugin-node-resolve');

module.exports = {
  exports: 'default',
  entry: 'index.js',
  plugins: [
    babel({
      presets: [
        es2015rollup,
        reactPreset,
      ]
    }),
    nodeResolve({
      browser: true,
      jsnext: true,
      main: true,
    })
  ]
};