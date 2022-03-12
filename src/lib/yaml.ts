import { setCiFile } from './file'
import { CiConfigFileName } from './static'
export const generateCiConfig = (manager: string, extension: string) => {
  const install = manager === 'npm' ? `${manager} install` : manager
  const text = `
name: sjq
on: pull_request
jobs:
  lint:
    runs-on: ubuntu-latest
    env:
      ESLINT_PLUGIN_DIFF_COMMIT: "\${{ github.event.pull_request.base.sha }}..\${{ github.event.pull_request.head.sha }}"
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install packages
        run: ${install}
      - name: Lint jQuery
        run: npx eslint -c ${CiConfigFileName}${extension} --ext .js,.jsx,.ts,.tsx --fix .
`
  setCiFile(text)
}
