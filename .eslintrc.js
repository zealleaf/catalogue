// @ts-check
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  plugins: ['react', 'react-hooks', 'import', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['warn', { printWidth: 100 }]
  }
})
