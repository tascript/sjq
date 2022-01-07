import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import chalk from 'chalk'
import { JsonConfig } from '~/src/interface'
import { baseName } from './static'

const fileName = path.join(process.cwd(), 'package.json')

const install = (manager: string): Buffer => {
  validJsonFile()
  const packages = ['eslint', 'eslint-plugin-jquery', 'husky', 'lint-staged', '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser', 'eslint-plugin-diff']
  let command = ''
  switch (manager) {
    case 'npm':
      command = 'npm install -D '
    case 'yarn':
      command = 'yarn add -D '
  }
  const res = execSync(command + packages.join(' '))
  return res
}

const setPrecommit = (manager: string, extension: string) => {
  validJsonFile()
  const obj = JSON.parse(fs.readFileSync(fileName, 'utf-8')) as JsonConfig
  obj['lint-staged'] = {
    './**/*.{js,jsx,ts,tsx}': [
      `eslint --config ${baseName + extension} --fix`
    ]
  }
  const text = JSON.stringify(obj, null, 2)
  fs.writeFileSync(fileName, text)
  execSync('npx husky install')
  execSync(`npx husky add .husky/pre-commit '${manager} lint-staged'`)
}

const validJsonFile = () => {
  if (!fs.existsSync(fileName)) {
    console.log(chalk.red('Error: Please make package.json'))
    process.exit(1)
  }
}

export {
  install,
  setPrecommit
}
