const path = require('path')
const fse = require('fs-extra')

async function main() {
  const projectDir = path.join(__dirname, '..')

  await fse.remove(path.join(projectDir, '.next'))
}

main()
