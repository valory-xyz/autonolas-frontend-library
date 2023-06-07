import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  splitting: true,
  format: ['cjs', 'esm'],
  target: 'esnext',
  clean: true,
  bundle: true,
  dts: true,
  tsconfig: 'tsconfig.json',
})