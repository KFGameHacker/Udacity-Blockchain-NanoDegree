const Web3 = require('web3');

let EndPoint = "https://mainnet.infura.io/v3/10f4235e67174a6694e663d6460c37d2";
let account = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
let web3 = new Web3(EndPoint);

web3.eth.getGasPrice().then(console.log);