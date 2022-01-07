export interface ESLintConfig extends Object {
  plugins?: string[]
  extends?: string[]
  parser?: string
  parserOptions?: {
    ecmaVersion: number | string
    sourceType: 'script' | 'module'
  }
}

export interface JsonConfig extends Object {
  husky?: {
    hooks?: {
      'pre-commit'?: string
    }
  },
  'lint-staged': {
    [index: string]: string[]
  }
}
