module.exports = {
  input: 'index.js',
  plugins: [
    require('rollup-plugin-babel')({
      presets: [
        ["es2015", {modules: false}],
        "react"
      ],
      babelrc: false
    }),
    require('rollup-plugin-node-resolve')({
      browser: true,
      jsnext: true,
      main: true
    })
  ]
};