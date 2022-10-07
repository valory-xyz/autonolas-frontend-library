module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 0,
    'no-else-return': 2,
    'max-params': [1, { max: 3 }],
    'no-console': [2, { allow: ['warn', 'error'] }],
    'jest/consistent-test-it': ['error', { fn: 'it' }],
    'jest/no-conditional-expect': ['warn'],
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
  ignorePatterns: ['src/documentation/**/*', '*.stories.*', '**/stories/**', 'dist/**'],
};
