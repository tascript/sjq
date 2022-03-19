import fs from 'fs'
import { generateLintConfigFile } from './file'
import { generateConfigText } from './static'
import { generateLintConfig } from './config'
import { ESLintConfig } from '~/src/interface'
import { generateCiConfig } from './config'

export const setJsonConfig = (manager: string) => {
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
  generateCiConfig(manager, extension)
}
