import path from 'path'
import fse from 'fs-extra'
import { task } from 'hardhat/config'
import { TASK_CLEAN } from 'hardhat/builtin-tasks/task-names'

task(TASK_CLEAN, 'Overrides the standard clean task', async (_, { config }, runSuper) => {
  const projectDir = path.join(__dirname, '..')

  await Promise.all([
    fse.remove(path.join(projectDir, 'artifacts')),
    fse.remove(path.join(projectDir, 'cache')),
    fse.remove(path.join(projectDir, 'coverage')),
    fse.remove(path.join(projectDir, 'coverage.json')),
    fse.remove(path.join(projectDir, '.eslintcache'))
  ])
  if (config.typechain?.outDir) {
    await fse.remove(config.typechain.outDir)
  }
  await runSuper()
})
