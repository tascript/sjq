import { ESLintConfig } from '~/src/interface'

export const setConfig = (obj: ESLintConfig) => {
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
