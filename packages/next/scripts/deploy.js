/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const { execSync } = require('child_process')

const { log } = console

function main() {
  const stdio = 'inherit'
  const projectDir = path.join(__dirname, '..')

  log('Cleaning up...')
  execSync('yarn clean', { cwd: projectDir, stdio })
  log('Building project...')
  execSync('yarn build', { cwd: projectDir, stdio })
  log('Exporting project...')
  execSync('yarn export', { cwd: projectDir, stdio })
  log('Deploying project...')
  execSync('fleek site:deploy', { cwd: projectDir, stdio })
}

main()
