import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'
import chalk from 'chalk'
import { JsonConfig } from '~/src/interface'
import { baseName, packages } from './static'

const fileName = path.join(process.cwd(), 'package.json')

export const install = (manager: string) => {
  validJsonFile()
  const command = generateInstallCommand(manager)
  spawnSync(command[0], [...command.slice(1), ...packages], { stdio: 'inherit' })
}

export const setPrecommit = (manager: string, extension: string) => {
  validJsonFile()
  const obj = JSON.parse(fs.readFileSync(fileName, 'utf-8')) as JsonConfig
  obj['scripts'] = {
    ...obj['scripts'],
    'postinstall': 'husky install',
    'lint:sjq': `eslint -c ${baseName + extension} --ext .js,.jsx,.ts,.tsx --fix .`
  }
  obj['lint-staged'] = {
    './**/*.{js,jsx,ts,tsx}': [
      `eslint --config ${baseName + extension} --fix`
    ]
  }
  const text = JSON.stringify(obj, null, 2)
  fs.writeFileSync(fileName, text)
  spawnSync('npx', ['husky', 'install'], { stdio: 'inherit' })
  spawnSync('npx', ['husky', 'add', '.husky/pre-commit', `${manager} lint-staged`], { stdio: 'inherit' })
}

const validJsonFile = () => {
  if (!fs.existsSync(fileName)) {
    console.log(chalk.red('Error: Please make package.json'))
    process.exit(1)
  }
}

export const generateInstallCommand = (manager: string): string[] => {
  let command: string[] = []
  switch (manager) {
    case 'npm':
      command = [manager, 'install', '-D']
      break
    case 'yarn':
      command = [manager, 'add', '-D']
      break
  }
  return command
}
