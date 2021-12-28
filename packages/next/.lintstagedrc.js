module.exports = {
  '*.ts': ['next lint --cache -c .eslintrc.js --fix .', 'prettier --config .prettierrc.js --write .'],
  '*.tsx': ['next lint --cache -c .eslintrc.js --fix .', 'prettier --config .prettierrc.js --write .'],
  '*.js': ['next lint --cache -c .eslintrc.js --fix .', 'prettier --config .prettierrc.js --write .'],
  '*.md': 'prettier --config .prettierrc.js --write .'
}
