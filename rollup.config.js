import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    resolve(),
    babel({
      babelrc: false,
      exclude: ['node_modules/**'],
      plugins: [
        '@babel/plugin-external-helpers',
        '@babel/plugin-transform-flow-strip-types'
      ],
      presets: [
        '@babel/preset-react',
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-flow'
      ]
    }),
    commonjs()
  ],
  external: [
    'react',
    'react-dom',
    'prop-types'
  ]
}
