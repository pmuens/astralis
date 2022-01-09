module.exports = {
  extends: ['next', 'next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    eqeqeq: 'error',
    'no-console': 'error'
  }
}
