import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { baseName } from './static'

type Status = 'exist' | 'init'

interface SetConfigFileResponse {
  extension: string
  status: Status
  fileName: string
}

const setConfigFile = (extension: string): SetConfigFileResponse => {
  const target = fs.existsSync(path.join(process.cwd(), baseName + extension))
  if (!target) {
    const command = `touch ${baseName + extension}`
    execSync(command)
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

export {
  setConfigFile
}
