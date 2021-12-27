module.exports = {
  extends: 'solhint:recommended',
  plugins: ['prettier'],
  rules: {
    'code-complexity': ['error', 7],
    'compiler-version': ['error', '>=0.8.11'],
    'const-name-snakecase': 'off',
    'constructor-syntax': 'error',
    'func-param-name-mixedcase': 'error',
    'func-visibility': ['error', { ignoreConstructors: true }],
    'max-line-length': ['error', 120],
    'modifier-name-mixedcase': 'error',
    'no-empty-blocks': 'off',
    ordering: 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'private-vars-leading-underscore': 'error',
    'reason-string': ['warn', { maxLength: 64 }]
  }
}
