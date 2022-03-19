import fs from 'fs'
import path from 'path'
import { ciLintConfigFileName } from './static'

type Status = 'exist' | 'init'

interface GenerateLintConfigFileResponse {
  extension: string
  status: Status
  fileName: string
}

export const generateLintConfigFile = (extension: string): GenerateLintConfigFileResponse => {
  const target = fs.existsSync(path.join(process.cwd(), ciLintConfigFileName + extension))
  if (!target) {
    fs.writeFileSync(path.join(process.cwd(), (ciLintConfigFileName + extension)), '')
    return {
      extension,
      status: 'init',
      fileName: path.join(process.cwd(), ciLintConfigFileName + extension)
    }
  }
  return {
    extension,
    status: 'exist',
    fileName: path.join(process.cwd(), ciLintConfigFileName + extension)
  }
}
