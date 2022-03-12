import fs from 'fs'
import { setConfigFile } from './file'
import { generateConfigText } from './static'
import { setConfig } from './config'
import { ESLintConfig } from '~/src/interface'
import { setPrecommit } from './package'
import { generateCiConfig } from './yaml'

export const setJsonConfig = (manager: string, isCi: boolean) => {
  const { status, fileName, extension } = setConfigFile('.json', isCi)
  const configText = generateConfigText(isCi)
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

    setConfig(obj)
    const text = JSON.stringify(configText, null, 2)
    fs.writeFileSync(fileName, text)
  }
  isCi ? generateCiConfig(manager) : setPrecommit(manager, extension)
}
