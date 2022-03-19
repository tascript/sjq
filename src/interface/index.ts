export interface ESLintConfig extends Object {
  plugins?: string[]
  extends?: string[]
  parser?: string
  parserOptions?: {
    ecmaVersion: number | string
    sourceType: 'script' | 'module'
  }
}
