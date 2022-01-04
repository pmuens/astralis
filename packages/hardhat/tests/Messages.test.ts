import { ethers } from 'hardhat'
import { expect } from 'chai'
import { Block } from '@ethersproject/abstract-provider'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

import { Messages } from '../types'

describe('Messages', () => {
  let block: Block
  let messages: Messages
  let user1: SignerWithAddress
  let user2: SignerWithAddress
  let deployer: SignerWithAddress

  beforeEach(async () => {
    ;[deployer, user1, user2] = await ethers.getSigners()
    const factory = await ethers.getContractFactory('Messages', deployer)
    messages = (await factory.deploy()) as Messages
    const blockNumber = await ethers.provider.getBlockNumber()
    block = await ethers.provider.getBlock(blockNumber)
  })

  describe('#createMessage()', () => {
    it("should revert when the message's body is empty", async () => {
      await expect(messages.connect(user1).createMessage('')).to.be.revertedWith("can't be empty")
    })

    it('should be possible to create a new message', async () => {
      const id = ethers.BigNumber.from(0)
      const body = 'Hello World'
      const owner = user1.address
      const createdAt = ethers.BigNumber.from(block.timestamp + 1)
      const updatedAt = ethers.BigNumber.from(block.timestamp + 1)
      const isEntity = true

      await expect(messages.connect(user1).createMessage('Hello World'))
        .to.emit(messages, 'CreateMessage')
        .withArgs(id, owner, body, createdAt)
      expect(await messages.nextId()).to.equal(id.add(1))
      expect(await messages.getMessage(id)).to.deep.equal([id, body, owner, createdAt, updatedAt, isEntity])
    })
  })

  describe('#updateMessage()', () => {
    it("should revert when the message doesn't exist", async () => {
      await expect(messages.connect(user1).updateMessage(0, '')).to.be.revertedWith("doesn't exist")
    })

    it("should revert when the caller is not the message's owner", async () => {
      await messages.connect(user1).createMessage('Hello World')
      await expect(messages.connect(user2).updateMessage(0, '')).to.be.revertedWith("isn't the owner")
    })

    it("should revert when the message's body is empty", async () => {
      await messages.connect(user1).createMessage('Hello World')
      await expect(messages.connect(user1).updateMessage(0, '')).to.be.revertedWith("can't be empty")
    })

    it('should be possible to update a message', async () => {
      await messages.connect(user1).createMessage('Hello World')
      expect(await messages.nextId()).to.equal(1)

      const id = ethers.BigNumber.from(0)
      const body = 'Goodbye World'
      const owner = user1.address
      const createdAt = ethers.BigNumber.from(block.timestamp + 1)
      const updatedAt = ethers.BigNumber.from(block.timestamp + 2)
      const isEntity = true

      await expect(messages.connect(user1).updateMessage(id, body))
        .to.emit(messages, 'UpdateMessage')
        .withArgs(id, owner, body, updatedAt)
      expect(await messages.getMessage(id)).to.deep.equal([id, body, owner, createdAt, updatedAt, isEntity])
    })
  })

  describe('#removeMessage()', () => {
    it("should revert when the message doesn't exist", async () => {
      await expect(messages.connect(user1).removeMessage(0)).to.be.revertedWith("doesn't exist")
    })

    it("should revert when the caller is not the message's owner", async () => {
      await messages.connect(user1).createMessage('Hello World')
      await expect(messages.connect(user2).removeMessage(0)).to.be.revertedWith("isn't the owner")
    })

    it('should be possible to remove a message', async () => {
      const id = ethers.BigNumber.from(0)
      const body = 'Hello World'
      const owner = user1.address
      const removedAt = ethers.BigNumber.from(block.timestamp + 2)

      await messages.connect(user1).createMessage(body)
      expect(await messages.nextId()).to.equal(1)

      await expect(messages.connect(user1).removeMessage(id))
        .to.emit(messages, 'RemoveMessage')
        .withArgs(id, owner, body, removedAt)

      await expect(messages.getMessage(id)).to.be.revertedWith("doesn't exist")
    })
  })

  describe('#getMessage()', () => {
    it("should revert when the message doesn't exist", async () => {
      await expect(messages.getMessage(0)).to.be.revertedWith("doesn't exist")
    })

    it('should be possible to get information about a message', async () => {
      const id = ethers.BigNumber.from(0)
      const body = 'Hello World'
      const owner = user1.address
      const createdAt = ethers.BigNumber.from(block.timestamp + 1)
      const updatedAt = ethers.BigNumber.from(block.timestamp + 1)
      const isEntity = true

      await messages.connect(user1).createMessage(body)
      expect(await messages.nextId()).to.equal(1)

      expect(await messages.getMessage(id)).to.deep.equal([id, body, owner, createdAt, updatedAt, isEntity])
    })
  })

  describe('#messages()', () => {
    it('should be possible to get information about a message', async () => {
      const id = ethers.BigNumber.from(0)
      const body = 'Hello World'
      const owner = user1.address
      const createdAt = ethers.BigNumber.from(block.timestamp + 1)
      const updatedAt = ethers.BigNumber.from(block.timestamp + 1)
      const isEntity = true

      await messages.connect(user1).createMessage(body)
      expect(await messages.nextId()).to.equal(1)

      expect(await messages.messages(id)).to.deep.equal([id, body, owner, createdAt, updatedAt, isEntity])
    })

    it("shouldn't revert for non-existent messages", async () => {
      const id = ethers.BigNumber.from(0)
      const body = ''
      const owner = ethers.constants.AddressZero
      const createdAt = ethers.BigNumber.from(0)
      const updatedAt = ethers.BigNumber.from(0)
      const isEntity = false

      expect(await messages.messages(id)).to.deep.equal([id, body, owner, createdAt, updatedAt, isEntity])
    })
  })

  describe('#nextId()', () => {
    it('should start with a value of 0', async () => {
      expect(await messages.nextId()).to.equal(0)
    })

    it('should be possible to get the value of the next message id', async () => {
      await messages.connect(user1).createMessage('Hello World')
      expect(await messages.nextId()).to.equal(1)
    })
  })
})
