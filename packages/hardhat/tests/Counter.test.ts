import { ethers } from 'hardhat'
import { expect } from 'chai'

import { Counter } from '../types'

describe('Counter', () => {
  let counter: Counter

  beforeEach(async () => {
    const factory = await ethers.getContractFactory('Counter')
    counter = (await factory.deploy(0)) as Counter
  })

  it('should be possible to set the counter', async () => {
    await counter.set(10)
    expect(await counter.get()).to.equal(10)
  })

  it('should be possible to increment the counter', async () => {
    await expect(counter.increment()).to.emit(counter, 'Increment').withArgs(0, 1)
    expect(await counter.get()).to.equal(1)
  })

  it('should be possible to decrement the counter', async () => {
    await counter.set(1)
    await expect(counter.decrement()).to.emit(counter, 'Decrement').withArgs(1, 0)
    expect(await counter.get()).to.equal(0)
  })
})
