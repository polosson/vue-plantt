module.exports = {
    root: true,
    env: {
        node: true,
    },
    plugins: ['vue'],
    extends: [
        'plugin:vue/recommended',
        '@vue/airbnb',
        '@vue/typescript',
    ],
    rules: {
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4],
        'vue/html-indent': ['error', 4],
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
};
