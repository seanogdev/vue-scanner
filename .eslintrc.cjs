module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-console': 'off',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['tsup'],
      },
    ],
  },
  root: true,
};
