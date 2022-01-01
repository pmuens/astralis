/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const fse = require('fs-extra')

async function main() {
  const projectDir = path.join(__dirname, '..')

  await fse.remove(path.join(projectDir, '.next'))
  await fse.remove(path.join(projectDir, 'out'))
}

main()
