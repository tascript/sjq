import fs from 'fs'
import path from 'path'
import { baseName, ciBaseName, ciDirName } from './static'

type Status = 'exist' | 'init'

interface SetConfigFileResponse {
  extension: string
  status: Status
  fileName: string
}

export const setConfigFile = (extension: string): SetConfigFileResponse => {
  const target = fs.existsSync(path.join(process.cwd(), baseName + extension))
  if (!target) {
    fs.writeFileSync(path.join(process.cwd(), (baseName + extension)), '')
    return {
      extension,
      status: 'init',
      fileName: path.join(process.cwd(), baseName + extension)
    }
  }
  return {
    extension,
    status: 'exist',
    fileName: path.join(process.cwd(), baseName + extension)
  }
}

export const setCiFile = () => {
  const targetDir = fs.existsSync(path.join(process.cwd(), ciDirName))
  if (!targetDir) {
    fs.mkdirSync(path.join(process.cwd(), ciDirName))
  }
  const targetFile = fs.existsSync(path.join(process.cwd(), ciDirName, ciBaseName))
  if (!targetFile) {
    fs.writeFileSync(path.join(process.cwd(), ciDirName, ciBaseName), '')
  }
}
