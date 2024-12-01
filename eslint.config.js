import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
    js.configs.recommended,
    prettier,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jquery
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
        },
    },
];
