import prompts from 'prompts'
import chalk from 'chalk'
import { install } from './lib/package'
import { packageNames } from './lib/static'
import { setJsonConfig } from './lib/json'

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
      type: 'toggle',
      name: 'need',
      message: `Can I install these packages?: ${packageNames}`,
      initial: true,
      active: 'yes',
      inactive: 'no'
    }
  ])
  const { manager, need } = res
  if (manager === undefined || need === undefined) {
    console.log(chalk.red('Error: Please select choices'))
    return
  }
  if (!!need) {
    install(manager.toString())
  }
  setJsonConfig(manager)
})()
