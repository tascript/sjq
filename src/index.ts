import { install, getPackageManager } from './lib/package'
import { setJsonConfig } from './lib/json'

const manager = getPackageManager()
install(manager)
setJsonConfig(manager)
