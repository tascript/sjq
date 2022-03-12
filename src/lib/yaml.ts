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
        run: ${manager} run lint:sjq
`
  setCiFile(text)
}
