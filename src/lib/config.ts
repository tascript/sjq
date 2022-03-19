import fs from 'fs'
import { ESLintConfig } from '~/src/interface'
import { generateLintConfigFile } from './file'
import { ciLintConfigFileName, generateConfigText } from './static'
import { spawnSync } from 'child_process'

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

export const execLint = () => {
  const { status, fileName, extension } = generateLintConfigFile('.json')
  const configText = generateConfigText()
  if (status === 'init') {
    const text = JSON.stringify(configText, null, 2)
    fs.writeFileSync(fileName, text)
  } else if (status === 'exist') {
    const obj = JSON.parse(fs.readFileSync(fileName, 'utf-8')) as ESLintConfig

    if (!obj) {
      const text = JSON.stringify(configText, null, 2)
      fs.writeFileSync(fileName, text)
      return
    }

    generateLintConfig(obj)
    const text = JSON.stringify(configText, null, 2)
    fs.writeFileSync(fileName, text)
  }
  spawnSync('npx', ['eslint', '-c', `${ciLintConfigFileName}${extension}`, '--ext', '.js,.jsx,.ts,.tsx', '--fix', '.'], { stdio: 'inherit' })
}
