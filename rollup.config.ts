import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import path from 'path'

export default {
  input: path.join(__dirname, 'src', 'index.ts'),
  output: {
    file: path.join(__dirname, 'dist', 'index.js'),
    format: 'cjs',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
  ]
}
