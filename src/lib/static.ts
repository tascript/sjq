export const generateConfigText = (isCi: boolean) => {
  const base = {
    plugins: [
      'jquery',
      '@typescript-eslint'
    ],
    extends: [
      'eslint:recommended',
      'plugin:jquery/deprecated',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  }
  if (isCi) {
    return base
  }
  base.extends.push('plugin:diff/staged')
  return base
}
export const packages = ['eslint', 'eslint-plugin-jquery', 'husky', 'lint-staged', 'typescript', '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser', 'eslint-plugin-diff'] as const
export const packageNames = packages.reduce((pre, cur) => pre + `'${cur}', `, '').slice(0, -2)
export const localConfigFileName = '.eslintrc_local.sjq'
export const CiConfigFileName = '.eslintrc_ci.sjq'
export const ciPriDirName = '.github'
export const ciSecDirName = 'workflows'
export const ciBaseName = 'sjq.yml'
