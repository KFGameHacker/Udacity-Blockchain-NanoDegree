var Web3 = require('web3');
var web3 = new Web3('HTTP://127.0.0.1:8545');

web3.eth.getTransactionCount('0x3e0421fe524d95f3ffc0557d0c9fabb587adc99f').then(console.log);