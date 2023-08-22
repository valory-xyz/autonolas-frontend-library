import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  splitting: true,
  sourcemap: true,
  minify: true,
  dts: true,
  target: 'es5',
  treeshake: true,
  entry: {
    index: 'src/index.ts',
  },
  minifyWhitespace: true,
  minifySyntax: true,
  tsconfig: 'tsconfig.json',
});
