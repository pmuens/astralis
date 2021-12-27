/* eslint-disable no-console */

import { HardhatRuntimeEnvironment } from 'hardhat/types'

export default async ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const { address } = await deploy('Counter', {
    from: deployer,
    args: [0],
    log: true
  })

  console.log(`Counter deployed to ${address}`)
}
