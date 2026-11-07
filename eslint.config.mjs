import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';

const sharedLayers = ['components', 'api', 'hooks', 'utils'];

const featuresDir = fileURLToPath(new URL('./src/features', import.meta.url));

const features = fs.existsSync(featuresDir)
  ? fs
      .readdirSync(featuresDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  : [];

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'node_modules/**',
    'next-env.d.ts',
  ]),

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    rules: {
      'no-console': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-empty-function': 'error',

      'react/prop-types': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },

  // Architectuurregels
  {
    files: ['src/**/*.{ts,tsx}'],

    rules: {
      // No circular dependencies
      'import/no-cycle': ['error', { ignoreExternal: true }],

      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // No feature-to-app dependencies
            ...['features', ...sharedLayers].map((layer) => ({
              target: `./src/${layer}`,
              from: './src/app',
              message:
                'Features and shared modules must not depend on route implementations.',
            })),

            // No shared-to-feature dependencies
            ...sharedLayers.map((layer) => ({
              target: `./src/${layer}`,
              from: './src/features',
              message:
                'Shared modules must not depend on feature implementations.',
            })),

            // No cross-feature dependencies
            ...features.map((feature) => ({
              target: `./src/features/${feature}`,
              from: './src/features',
              except: [`./${feature}`],
              message:
                'Features must not depend directly on other feature implementations.',
            })),

            // No utils-to-feature or framework dependencies
            {
              target: './src/utils',
              from: [
                './src/app',
                './src/features',
                './src/components',
                './src/api',
                './src/hooks',
              ],
              message:
                'Generic utilities must remain independent of application-specific modules.',
            },
          ],
        },
      ],
    },
  },

  prettierConfig,
]);
