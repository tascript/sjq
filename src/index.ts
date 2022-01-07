import prompts from 'prompts'
import chalk from 'chalk'
import { install } from './lib/package'
import { setJsonConfig } from './lib/json'
import { setJavaScriptConfig } from './lib/javascript'

(async () => {
  const res = await prompts([
    {
      type: 'select',
      name: 'manager',
      message: "Please select this project's package manager",
      choices: [
        {
          title: 'npm', value: 'npm'
        },
        {
          title: 'yarn', value: 'yarn'
        },
      ],
    },
    {
      type: 'select',
      name: 'extension',
      message: "Please select this extension of eslint config",
      choices: [
        {
          title: 'JSON', value: 'JSON'
        },
        {
          title: 'JavaScript', value: 'JavaScript'
        },
      ],
    },
    {
      type: 'toggle',
      name: 'need',
      message: "Can I install these packages?: 'eslint', 'eslint-plugin-jquery', 'husky', 'lint-staged', '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser'",
      initial: true,
      active: 'yes',
      inactive: 'no'
    }
  ])
  const { manager, extension, need } = res
  if (!!need) {
    console.log(chalk.greenBright(install(manager.toString())))
  }
  switch (extension) {
    case 'JSON':
      setJsonConfig(manager.toString())
      break
    case 'JavaScript':
      setJavaScriptConfig(manager.toString())
      break
    default:
      throw new Error('Something is wrong...');
  }
})()
