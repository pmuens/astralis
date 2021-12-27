# Template EVM dApp

Monorepo Template for EVM-based dApps.

## Setup

1. `git clone <url>`
2. `cp ./packages/hardhat/.env.example ./packages/hardhat/.env`
3. Update `./packages/hardhat/.env`
4. `yarn install`
5. `yarn dev`

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

yarn workspace <name> add [-D] <dependency>
yarn workspace <name> run <script>

NETWORK= yarn hardhat:deploy
NETWORK= yarn hardhat:export
NETWORK= yarn hardhat:verify
```

## Checklists

### Updating the Solidity Compiler

- [ ] Do global search for current version
- [ ] Update findings to use new version

### Adding a Workspace

- [ ] Update `eslint.workingDirectories` config in [`.vscode/settings.json`](./.vscode/settings.json)
