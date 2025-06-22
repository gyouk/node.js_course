import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.js'],
        extends: ['js/recommended'],
        plugins: { js},
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
        },
        rules: {
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            'no-console': 'warn',
        },
    },
]);
