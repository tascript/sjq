import { ESLintConfig } from '~/src/interface'
import { setCiFile } from './file'
import { ciLintConfigFileName } from './static'

export const generateLintConfig = (obj: ESLintConfig) => {
  if (obj.plugins) {
    if (!obj.plugins.includes('jquery')) {
      obj.plugins.push('jquery')
    }
    if (!obj.plugins.includes('@typescript-eslint')) {
      obj.plugins.push('@typescript-eslint')
    }
  } else {
    obj.plugins = ['jquery', '@typescript-eslint']
  }

  const plugins = ['eslint:recommended', 'plugin:jquery/deprecated', 'plugin:diff/staged']
  if (obj.extends) {
    for (const p of plugins) {
      if (!obj.extends.includes(p)) {
        obj.extends.push(p)
      }
    }
  } else {
    obj.extends = plugins
  }

  obj.parser = '@typescript-eslint/parser'
  obj.parserOptions = {
    ecmaVersion: 'latest',
    sourceType: 'module'
  }
}
export const generateCiConfig = (manager: string, extension: string) => {
  const install = manager === 'npm' ? `${manager} install` : manager
  const text = `
name: sjq
on: pull_request
jobs:
  lint:
    runs-on: ubuntu-latest
    env:
      ESLINT_PLUGIN_DIFF_COMMIT: "\${{ github.event.pull_request.base.sha }}..\${{ github.event.pull_request.head.sha }}"
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install packages
        run: ${install}
      - name: Lint jQuery
        run: npx eslint -c ${ciLintConfigFileName}${extension} --ext .js,.jsx,.ts,.tsx --fix .
`
  setCiFile(text)
}
