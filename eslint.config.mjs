import js from '@eslint/js';
import query from '@tanstack/eslint-plugin-query';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier/flat';
import playwright from 'eslint-plugin-playwright';
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwindcss from 'eslint-plugin-tailwindcss';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // Preserve eslintrc's dotfile exclusions and the former .eslintignore entry.
  globalIgnores(['**/.*', '**/pull-remote.js']),
  js.configs.recommended,
  ...nextVitals,
  prettier,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
    // Next registers the React plugin; only layer the legacy recommended rules.
    rules: react.configs.recommended.rules,
  },
  tailwindcss.configs.recommended,
  playwright.configs['flat/recommended'],
  ...query.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'prefer-arrow-functions': preferArrowFunctions,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      tailwindcss: {
        cssConfigPath: 'src/app/globals.css',
        functions: ['cn', 'cva', 'clsx'],
      },
    },
    rules: {
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effects first, e.g. 'server-only'.
            ['^\\u0000'],
            ['^(react|next)'],
            ['^(@storybook/react|msw)'],
            ['^@?\\w'],
            [
              '^@/shared/core',
              '^@/shared/utils',
              '^@/shared/atoms',
              '^@/shared/data',
              '^@/shared/hooks',
              '^@/shared/components',
              '^@/shared/providers',
            ],
            ['^@/shared/testutils'],
            [
              '^(@)(/.*/core|$)',
              '^(@)(/.*/utils|$)',
              '^(@)(/.*/atoms|$)',
              '^(@)(/.*/data|$)',
              '^(@)(/.*/hooks|$)',
              '^(@)(/.*/components|$)',
              '^(@)(/.*/providers|$)',
            ],
            ['^(@)(/.*/testutils|$)'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
      'prefer-arrow-functions/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          singleReturnOnly: true,
          classPropertiesAllowed: false,
        },
      ],
      'react/boolean-prop-naming': [
        'error',
        { rule: '^(is|has|should|show|hide|can|init)[A-Z]([A-Za-z0-9]?)+' },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/require-default-props': 'off',
      'react/prop-types': 'off',
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-custom-classname': 'off',
      'playwright/expect-expect': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
]);
