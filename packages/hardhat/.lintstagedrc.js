module.exports = {
  '*.ts': ['eslint --cache -c .eslintrc.js --fix .', 'prettier --config .prettierrc.js --write .'],
  '*.sol': ['solhint -c .solhintrc.js --fix **/*.sol', 'prettier --config .prettierrc.js --write .'],
  '*.md': 'prettier --config .prettierrc.js --write .'
}
