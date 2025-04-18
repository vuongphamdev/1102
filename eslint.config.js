import pluginNext from '@next/eslint-plugin-next';
import parser from '@typescript-eslint/parser';

export default [
  {
    name: 'ESLint Config - nextjs',
    ignores: ['node_modules/**', '.next/**', 'build/**', 'dist/**', 'public/**', 'eslint.config.js'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        HTMLImageElement: 'readonly',
        React: 'readonly'
      }
    },
    plugins: {
      '@next/next': pluginNext,
    },
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
];