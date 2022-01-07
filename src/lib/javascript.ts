import fs from 'fs'
import { setConfigFile } from './file'
import { config } from './static'
import { setConfig } from './config'
import { ESLintConfig } from '~/src/interface'
import { setPrecommit } from './package'

const setJavaScriptConfig = (manager: string) => {
  const { status, fileName, extension } = setConfigFile('.js')
  if (status === 'init') {
    const text = 'module.exports = ' + JSON.stringify(config, null, 2)
    fs.writeFileSync(fileName, text)
  } else if (status === 'exist') {
    const obj = JSON.parse(fs.readFileSync(fileName, 'utf-8').replace(/^module.exports =/, '')) as ESLintConfig

    if (!obj) {
      const text = 'module.exports = ' + JSON.stringify(config, null, 2)
      fs.writeFileSync(fileName, text)
      return
    }

    setConfig(obj)
    const text = 'module.exports = ' + JSON.stringify(config, null, 2)
    fs.writeFileSync(fileName, text)
  }
  setPrecommit(manager, extension)
}

export {
  setJavaScriptConfig
}
