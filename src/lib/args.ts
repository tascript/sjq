import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export const args = yargs(hideBin(process.argv)).option('config', {
  alias: 'c',
  type: 'boolean',
  description: 'generate config only'
}).help()
