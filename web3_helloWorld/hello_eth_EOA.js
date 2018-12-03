const Web3 = require('web3');

let EndPoint = "https://rinkeby.infura.io/v3/10f4235e67174a6694e663d6460c37d2";
let account = '0xbb2Ae8f0c2079bb3a0e54bB05b9E59d12531C316';
let web3 = new Web3(EndPoint);

web3.eth.getTransactionCount('0xbb2Ae8f0c2079bb3a0e54bB05b9E59d12531C316').then(console.log);