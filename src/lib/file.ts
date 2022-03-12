import fs from 'fs'
import path from 'path'
import { localConfigFileName, CiConfigFileName, ciBaseName, ciPriDirName, ciSecDirName } from './static'

type Status = 'exist' | 'init'

interface SetConfigFileResponse {
  extension: string
  status: Status
  fileName: string
}

export const setConfigFile = (extension: string, isCi: boolean): SetConfigFileResponse => {
  const configFileName = isCi ? CiConfigFileName : localConfigFileName
  const target = fs.existsSync(path.join(process.cwd(), configFileName + extension))
  if (!target) {
    fs.writeFileSync(path.join(process.cwd(), (configFileName + extension)), '')
    return {
      extension,
      status: 'init',
      fileName: path.join(process.cwd(), configFileName + extension)
    }
  }
  return {
    extension,
    status: 'exist',
    fileName: path.join(process.cwd(), configFileName + extension)
  }
}

export const setCiFile = (text: string) => {
  const targetPriDir = fs.existsSync(path.join(process.cwd(), ciPriDirName))
  if (!targetPriDir) {
    fs.mkdirSync(path.join(process.cwd(), ciPriDirName))
  }
  const targetSecDir = fs.existsSync(path.join(process.cwd(), ciPriDirName, ciSecDirName))
  if (!targetSecDir) {
    fs.mkdirSync(path.join(process.cwd(), ciPriDirName, ciSecDirName))
  }
  const targetFile = fs.existsSync(path.join(process.cwd(), ciPriDirName, ciSecDirName, ciBaseName))
  if (!targetFile) {
    fs.writeFileSync(path.join(process.cwd(), ciPriDirName, ciSecDirName, ciBaseName), '')
    fs.writeFileSync(path.join(process.cwd(), ciPriDirName, ciSecDirName, ciBaseName), text)
  }
}
