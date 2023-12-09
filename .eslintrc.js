module.exports = {
  env: {
    browser: true,
    webextensions: true,
    es2024: true
  },
  extends: [
    'standard',
    'eslint:recommended'
  ],
  plugins: [
    'html',
    '@html-eslint'
  ],
  overrides: [
    {
      files: ['*.html'],
      parser: '@html-eslint/parser',
      extends: ['plugin:@html-eslint/recommended']
    }
  ],
  rules: {
    '@html-eslint/indent': ['error', 2]
  }
}
