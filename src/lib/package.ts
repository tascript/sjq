import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'
import chalk from 'chalk'
import { packages } from './static'

interface PackageFileConfig {
  path: string,
  manager: string,
}

const fileName = path.join(process.cwd(), 'package.json')
const packageFileConfig: PackageFileConfig[] = [
  {
    path: path.join(process.cwd(), 'package-lock.json'),
    manager: 'npm'
  },
  {
    path: path.join(process.cwd(), 'yarn.lock'),
    manager: 'yarn'
  }
]

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

export const install = (manager: string) => {
  const command = generateInstallCommand(manager)
  spawnSync(command[0], [...command.slice(1), ...packages], { stdio: 'inherit' })
}

export const getPackageManager = (): string => {
  if (!fs.existsSync(fileName)) {
    console.log(chalk.red('Error: Please make package.json'))
    process.exit(1)
  }
  const index = packageFileConfig.findIndex((v) => fs.existsSync(v.path))
  if (index < 0) {
    console.log(chalk.red('Error: Please execute package install command'))
    process.exit(1)
  }
  return packageFileConfig[index].manager
}
