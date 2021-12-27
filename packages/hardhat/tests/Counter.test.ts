import { ethers } from 'hardhat'
import { expect } from 'chai'

describe('Counter', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let counter: any

  beforeEach(async () => {
    const factory = await ethers.getContractFactory('Counter')
    counter = await factory.deploy(0)
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
