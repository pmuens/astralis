# Template EVM dApp

Monorepo Template for EVM-based dApps.

## Setup

1. `git clone <url>`
2. `cp ./packages/hardhat/.env.example ./packages/hardhat/.env`
3. Update `./packages/hardhat/.env`
4. `cp ./packages/next/.env.example ./packages/next/.env`
5. Update `./packages/next/.env`
6. `yarn install`
7. `yarn dev`
8. MetaMask
   1. Import Hardhat Account #0 Private Key
   2. Switch to Hardhat Account #0
   3. Update "Localhost 8545" Network Chain ID to `31337` (Settings -> Networks -> Localhost 8545 -> Chain ID)
   4. Reset Account (Settings -> Advanced -> Reset Account)

## Deployment

### Hardhat

1. `yarn hardhat:clean`
2. Ensure that `./packages/hardhat/.env` is up-to-date
3. `NETWORK= yarn hardhat:deploy`
4. `NETWORK= yarn hardhat:verify`

### Next

1. `yarn next:clean`
2. Ensure that `./packages/next/.env` is up-to-date
3. `FLEEK_API_KEY= yarn workspace next exec 'fleek site:init'` \*
4. Open `./packages/next/.fleek.json` and change `publicDir` to `out` \*
5. `FLEEK_API_KEY= yarn next:deploy`

\* Not necessary for subsequent deployments.

## Useful Commands

```sh
yarn [<workspace>:]build
yarn [<workspace>:]clean
yarn [<workspace>:]coverage
yarn [<workspace>:]format
yarn [<workspace>:]lint
yarn [<workspace>:]lint-staged
yarn [<workspace>:]metrics
yarn [<workspace>:]test
yarn [<workspace>:]watch
NETWORK= FLEEK_API_KEY= yarn [<workspace>:]deploy
NETWORK= yarn [<workspace>:]export

yarn workspace <name> add [-D] <dependency>
yarn workspace <name> run <script>

NETWORK= yarn hardhat:deploy
NETWORK= yarn hardhat:export
NETWORK= yarn hardhat:verify

FLEEK_API_KEY= yarn workspace next exec 'fleek site:init'
FLEEK_API_KEY= yarn next:deploy
```

## Checklists

### Updating the Solidity Compiler

- [ ] Do global search for current version
- [ ] Update findings to use new version

### Adding a Workspace

- [ ] Update `eslint.workingDirectories` config in [`.vscode/settings.json`](./.vscode/settings.json)
