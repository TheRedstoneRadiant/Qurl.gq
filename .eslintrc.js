module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2021: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {},
  globals: {
    process: true,
  },
};
