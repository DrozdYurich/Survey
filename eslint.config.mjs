import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import globals from 'globals';

import nxEslintPlugin from '@nx/eslint-plugin';
export default [
  js.configs.recommended,
  ...nxEslintPlugin.configs['flat/base'],
  ...nxEslintPlugin.configs['flat/typescript'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.vue'],
    plugins: {
      vue: vuePlugin,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      ...vuePlugin.configs['base'].rules,
      ...vuePlugin.configs['vue3-recommended'].rules,
      'vue/multi-word-component-names': 'off',
      'vue/script-setup-uses-vars': 'error',
      'vue/no-unused-components': 'warn',
      'vue/no-unused-vars': 'warn',
      'vue/comment-directive': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    ignores: ['**/node_modules', '**/dist', '**/.nx', '**/coverage'],
  },
];
