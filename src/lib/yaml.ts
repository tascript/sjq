import { setCiFile } from './file'
export const generateCiConfig = (manager: string) => {
  const install = manager === 'npm' ? `${manager} install` : manager
  const text = `
name: sjq
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install packages
        run: ${install}
      - name: Lint jQuery
        run: run: git diff origin/\${{ github.head_ref }} origin/\${{ github.base_ref }} --unified=0 --diff-filter=ACMRTUXB --name-only | grep '/.*\.\(tsx\?\|jsx\?\)$' | xargs npx eslint -c .eslintrc.sjq.json --fix
`
  setCiFile(text)
}
