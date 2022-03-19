import { installPackages, getPackageManager } from './lib/package'
import { execLint } from './lib/config'

const manager = getPackageManager()
installPackages(manager)
execLint()
