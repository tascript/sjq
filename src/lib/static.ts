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
export const packages = ['eslint', 'eslint-plugin-jquery', 'husky', 'lint-staged', 'typescript', '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser', 'eslint-plugin-diff'] as const
export const packageNames = packages.reduce((pre, cur) => pre + `'${cur}', `, '').slice(0, -2)
export const baseName = '.eslintrc.sjq'
