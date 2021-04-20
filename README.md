# Dynamic NFT

This code creates a dynamic NFT using [Hardhat](https://hardhat.org/) development environment.
The Chainlink Hardhat box was used as a starting point:https://github.com/smartcontractkit/chainlink-hardhat-box

## Requirements

- NPM

## Installation

Set your `RINKEBY_RPC_URL` [environment variable.](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html). You can get one for free at [Infura's site.](https://infura.io/). You'll also need to set the variable `PRIVATE_KEY` which is your private key from you wallet, ie metamask.

```
export RINKEBY_RPC_URL='www.infura.io/asdfadsfafdadf'
export PRIVATE_KEY='abcdef'
```

Then you can install all the dependencies

```bash
npm install
```

Or

```bash
yarn install
```

## Deploy

Deployment scripts are in the [deploy](https://github.com/ZakAyesh/DynamicNFT/tree/master/deploy) directory. If required, edit the desired environment specific variables or constructor parameters in each script, then run the hardhat deployment plugin as follows. If no network is specified, it will default to the Rinkeby network.

```bash
npx hardhat deploy
```

## Test

Tests are located in the [test](https://github.com/ZakAyesh/DynamicNFT/tree/master/test) directory and can be modified as required. To run them:

```bash
npx hardhat test
```

## Run

The deployment output will give you the contract address after it is deployed. You can then use thes in conjunction with Hardhat tasks to perform operations on each contract.

```bash
npx hardhat fund-link --contract INSERT_YOUR_CONTRACT_ADDRESS_HERE
npx hardhat create-collectible --contract INSERT_YOUR_CONTRACT_ADDRESS_HERE
```
