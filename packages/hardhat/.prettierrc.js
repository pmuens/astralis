module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'auto',
  printWidth: 120,
  singleQuote: true,
  semi: false,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'none',
  overrides: [
    {
      files: '*.sol',
      options: {
        tabWidth: 4,
        singleQuote: false,
        explicitTypes: 'always'
      }
    }
  ],
  plugins: [require.resolve('prettier-plugin-solidity')]
}
