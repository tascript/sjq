export const generateConfigText = () => {
  return {
    plugins: [
      'jquery',
      '@typescript-eslint'
    ],
    extends: [
      'eslint:recommended',
      'plugin:jquery/deprecated',
      'plugin:diff/diff'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  }
}

export const packages = ['eslint', 'eslint-plugin-jquery', 'typescript', '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser', 'eslint-plugin-diff'] as const
export const ciLintConfigFileName = '.eslintrc_ci.sjq'
