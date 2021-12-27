import 'dotenv/config'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-deploy'
import 'hardhat-gas-reporter'
import '@typechain/hardhat'
import { HardhatUserConfig } from 'hardhat/config'

import './tasks/accounts'
import './tasks/clean'

const accounts = {
  mnemonic: process.env.MNEMONIC || 'test test test test test test test test test test test junk'
}

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  gasReporter: {
    enabled: process.env.REPORT_GAS === 'true',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    currency: 'USD',
    src: './contracts'
  },
  namedAccounts: {
    deployer: {
      default: 0
    },
    alice: {
      default: 1
    },
    bob: {
      default: 2
    },
    carol: {
      default: 3
    }
  },
  networks: {
    localhost: {
      live: false,
      saveDeployments: true,
      tags: ['local']
    },
    hardhat: {
      allowUnlimitedContractSize: false,
      forking: {
        enabled: process.env.FORKING === 'true',
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
      },
      live: false,
      saveDeployments: true,
      tags: ['test', 'local']
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 42,
      live: true,
      saveDeployments: true,
      tags: ['staging']
    }
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    deploy: './deploy',
    deployments: './deployments',
    root: '.',
    sources: './contracts',
    tests: './tests'
  },
  solidity: {
    version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 800
      }
    }
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v5'
  }
}

export default config
