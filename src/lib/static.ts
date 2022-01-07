export const config = {
  plugins: [
    'jquery',
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:jquery/deprecated',
    'plugin:diff/staged'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  }
} as const

export const baseName = '.eslintrc.sjq'
