/* eslint-disable no-console */

import { task } from 'hardhat/config'
import { Signer } from '@ethersproject/abstract-signer'

import { TASK_ACCOUNTS } from './task-names'

task(TASK_ACCOUNTS, 'Prints the list of accounts', async (_, { ethers }) => {
  const accounts: Signer[] = await ethers.getSigners()

  for (const account of accounts) {
    console.log(await account.getAddress())
  }
})
