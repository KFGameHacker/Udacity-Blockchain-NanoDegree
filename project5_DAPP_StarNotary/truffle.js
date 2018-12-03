const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = 'angle admit list doll empower solar lawn follow cause equip alley beauty';
const infura = 'https://rinkeby.infura.io/v3/10f4235e67174a6694e663d6460c37d2'

module.exports = {
  networks: { 
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: "*"
    }, 
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, infura),
      network_id: 4,
      gas : 6700000,
      gasPrice : 10000000000
    },
  }
};