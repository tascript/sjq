import fs from 'fs'
import path from 'path'
import { execSync, spawn } from 'child_process'
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
  const res = spawn(manager, [...words, ...packages], { stdio: 'inherit' })
  res.stdout?.on('daya', (c) => {
    console.log(c.toString)
  })
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
  const installRes = spawn('npx', ['husky', 'install'], { stdio: 'inherit' })
  installRes.stdout?.on('data', (c) => {
    console.log(c.toString)
  })
  const preCommitRes = spawn('npx', ['husky', 'add', '.husky/pre-commit', manager, 'lint-staged'], { stdio: 'inherit' })
  preCommitRes.stdout?.on('data', (c) => {
    console.log(c.toString)
  })
}

const validJsonFile = () => {
  if (!fs.existsSync(fileName)) {
    console.log(chalk.red('Error: Please make package.json'))
    process.exit(1)
  }
}
