import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'
import chalk from 'chalk'
import { JsonConfig } from '~/src/interface'
import { baseName, packages } from './static'

const fileName = path.join(process.cwd(), 'package.json')

export const install = (manager: string) => {
  validJsonFile()
  let words: string[] = []
  switch (manager) {
    case 'npm':
      words = ['install', '-D']
    case 'yarn':
      words = ['add', '-D']
  }
  spawnSync(manager, [...words, ...packages], { stdio: 'inherit' })
}

export const setPrecommit = (manager: string, extension: string) => {
  validJsonFile()
  const obj = JSON.parse(fs.readFileSync(fileName, 'utf-8')) as JsonConfig
  obj['lint-staged'] = {
    './**/*.{js,jsx,ts,tsx}': [
      `eslint --config ${baseName + extension} --fix`
    ]
  }
  const text = JSON.stringify(obj, null, 2)
  fs.writeFileSync(fileName, text)
  spawnSync('npx', ['husky', 'install'], { stdio: 'inherit' })
  spawnSync('npx', ['husky', 'add', '.husky/pre-commit', `"${manager} lint-staged"`], { stdio: 'inherit' })
}

const validJsonFile = () => {
  if (!fs.existsSync(fileName)) {
    console.log(chalk.red('Error: Please make package.json'))
    process.exit(1)
  }
}
