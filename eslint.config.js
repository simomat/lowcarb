import globals from 'globals'
import js from "@eslint/js"
import htmlEslint from '@html-eslint/eslint-plugin'
import promise from 'eslint-plugin-promise'

export default [
  js.configs.recommended,
  promise.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.webextensions
      }
    },
    plugins: {
      "@html-eslint": htmlEslint,
    },
    rules: {
      'no-promise-executor-return': 'error',
      'promise/no-return-in-finally': 'error',
      'promise/valid-params': 'error'
    }
  },
  {
    files: ["**/*.js"],
    rules: {
      indent: ["error", 2]
    }
  },
  {
    ...htmlEslint.configs["flat/recommended"],
    files: ["**/*.html"],
  },
  {
    files: ["**/*.html"],
    rules: {
      '@html-eslint/indent': ['error', 2]
    }
  },
]
