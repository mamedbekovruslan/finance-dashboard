import js from '@eslint/js';
import globals from 'globals';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import boundaries from 'eslint-plugin-boundaries';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

const FSD_LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'public', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactRecommended,
  reactJsxRuntime,
  {
    settings: {
      react: { version: 'detect' },
      'boundaries/elements': FSD_LAYERS.map((type) => ({
        type,
        pattern: `src/${type}/*`,
      })),
      'boundaries/ignore': ['src/main.tsx', 'src/vite-env.d.ts'],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      boundaries,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Feature-Sliced Design import direction: a layer may only import
      // itself or layers below it (app > pages > widgets > features > entities > shared).
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'app', allow: FSD_LAYERS },
            { from: 'pages', allow: ['pages', 'widgets', 'features', 'entities', 'shared'] },
            { from: 'widgets', allow: ['widgets', 'features', 'entities', 'shared'] },
            { from: 'features', allow: ['features', 'entities', 'shared'] },
            { from: 'entities', allow: ['entities', 'shared'] },
            { from: 'shared', allow: ['shared'] },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', 'src/test/**/*'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  prettierConfig,
);
