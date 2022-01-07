import fs from 'fs'
import { setConfigFile } from './file'
import { config } from './static'
import { setConfig } from './config'
import { ESLintConfig } from '~/src/interface'
import { setPrecommit } from './package'

const setJsonConfig = (manager: string) => {
  const { status, fileName, extension } = setConfigFile('.json')
  if (status === 'init') {
    const text = JSON.stringify(config, null, 2)
    fs.writeFileSync(fileName, text)
  } else if (status === 'exist') {
    const obj = JSON.parse(fs.readFileSync(fileName, 'utf-8')) as ESLintConfig

    if (!obj) {
      const text = JSON.stringify(config, null, 2)
      fs.writeFileSync(fileName, text)
      return
    }

    setConfig(obj)
    const text = JSON.stringify(config, null, 2)
    fs.writeFileSync(fileName, text)
  }
  setPrecommit(manager, extension)
}

export {
  setJsonConfig
}
