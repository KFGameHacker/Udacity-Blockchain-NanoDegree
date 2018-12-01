const Web3 = require('web3');

let web3 = new Web3('http://127.0.0.1:7545'); //8545 is granache cli port
//console.log(web3);
var sendingAddress = '0x1bbb0a0277463648115f25217512ba89e52661d8'
var receivingAddress = '0x930ae7b131daa5d0c37848c01183c18c335b7dc2'

web3.eth.getBalance(sendingAddress).then(console.log).catch(console.log);