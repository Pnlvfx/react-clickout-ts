/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import eslint from '@eslint/js';
import globals from 'globals';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import reactPlugin from 'eslint-plugin-react';
// @ts-expect-error notypes created by the mantainers.
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  {
    ignores: ['dist', 'coverage'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  // @ts-expect-error wrong types created by the manteiners.
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  unicorn.configs['flat/all'],
  sonarjs.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.builtin, ...globals.serviceworker, ...globals.browser, React: true },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    rules: {
      'no-var': 'error',
      semi: 'error',
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-multi-spaces': 'error',
      'no-empty-function': 'error',
      'no-floating-decimal': 'error',
      'no-implied-eval': 'error',
      'no-lone-blocks': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-new': 'error',
      'no-octal-escape': 'error',
      'no-return-await': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-throw-literal': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': 'error',
      'space-in-parens': 'error',
      'no-multiple-empty-lines': 'error',
      'no-unsafe-negation': 'error',
      'prefer-const': 'error',
      'react/jsx-sort-props': 'error',
      'react/no-array-index-key': 'error',
      'react/prefer-read-only-props': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-no-literals': 'error',
      'react/jsx-no-constructed-context-values': 'error',
      'no-console': 'warn',
      'sonarjs/todo-tag': 'warn',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'sonarjs/no-unused-vars': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/catch-error-name': 'off',
      'unicorn/no-null': 'off',
    },
  },
  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
);
