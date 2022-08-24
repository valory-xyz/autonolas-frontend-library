import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'styled-components': 'styled',
    },
  },
  // All the used libs needs to be here
  external: ['react', 'react-dom', 'react-proptypes', 'styled-components'],
  plugins: [
    json(),
    resolve(
      { extensions: ['.js', '.ts', '.jsx'] },
    ),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: ['node_modules/**', 'public/**'],
      extensions: ['.js', '.jsx'],
    }),
    url(),
    svgr({ svgo: false }),
  ],
};
