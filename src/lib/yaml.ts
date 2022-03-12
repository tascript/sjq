import { setCiFile } from './file'
export const generateCiConfig = (manager: string) => {
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
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install packages
        run: ${install}
      - name: Lint jQuery
        run: npx eslint -c .eslintrc.sjq.json --ext .js,.jsx,.ts,.tsx --fix .
`
  setCiFile(text)
}
