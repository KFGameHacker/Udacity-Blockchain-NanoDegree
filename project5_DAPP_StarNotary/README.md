## Project overview

Build additional functionality with your smart contract and deploy it on the public testnet to create a DApp.

## console output

/home# truffle migrate --network rinkeby --reset --compile-all
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/StarNotary.sol...
Compiling ./node_modules/openzeppelin-solidity/contracts/introspection/ERC165.sol...
Compiling ./node_modules/openzeppelin-solidity/contracts/introspection/IERC165.sol...
Compiling ./node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol...
Compiling ./node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol...
Compiling ./node_modules/openzeppelin-solidity/contracts/token/ERC721/IERC721.sol...
Compiling ./node_modules/openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol...
Compiling ./node_modules/openzeppelin-solidity/contracts/utils/Address.sol...
Writing artifacts to ./build/contracts

/home# truffle deploy --network rinkeby

Using network 'rinkeby'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x83c1513e94e9be45c4a8d5d92c75efc2f2d198c91f98be33244bc70e51c443ca
  Migrations: 0x31c365d95ab2df6f9eb32c90485c07230430feb2
Saving successful migration to network...
  ... 0xaa3fb677b9bfbff51b2402813666e800a6b82d1abe53ba7d76166b53e79f899b
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying StarNotary...
  ... 0xe3bac7464f5d2ab5564e92171ed03291e8393f7d3ef99a9789ba845ef31ca671
  StarNotary: 0x655b6701129f9bbf50369b93f745d9e732e0a1e3
Saving successful migration to network...
  ... 0x9f14111abee339dbd453d29bc5feed1bf01d3d7275d20767332510762d6b784c
Saving artifacts...

## Transaction ID
[0xe3bac7464f5d2ab5564e92171ed03291e8393f7d3ef99a9789ba845ef31ca671](https://rinkeby.etherscan.io/tx/0xe3bac7464f5d2ab5564e92171ed03291e8393f7d3ef99a9789ba845ef31ca671)

## Contract Address
[0x655b6701129f9bbf50369b93f745d9e732e0a1e3](https://rinkeby.etherscan.io/address/0x655b6701129f9bbf50369b93f745d9e732e0a1e3)


## star tokenId
1

## Udacity honor code

Giving credits for places that helped me to do this project

- Yury Prokashev, helped me on the slack channel to configure 2_deploy_contracts.js
- https://walkingtree.tech/deploying-a-smart-contract-in-rinkeby-using-infura/
- Udacity concepts section
- Udacity Decentralized Star Notary Project at: https://study-hall.udacity.com/sg-562321-1911/rooms/community:nd1309:562321-cohort-1911-project-2297
