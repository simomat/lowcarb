import globals from 'globals'
import js from "@eslint/js"
import html from 'eslint-plugin-html'
import htmlEslint from '@html-eslint/eslint-plugin'

export default [
  js.configs.recommended,
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
      html,
      "@html-eslint": htmlEslint,
    },
    rules: {
      indent: ["error", 2],
      '@html-eslint/indent': ['error', 2]
    }
  },
  {
    ...htmlEslint.configs["flat/recommended"],
    files: ["**/*.html"],
  },
]
