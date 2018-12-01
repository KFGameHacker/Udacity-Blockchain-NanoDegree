/*##########################
##     CONFIGURATION      ##
##########################*/

//  -- Step 1: Set up the appropriate configuration
var Web3 = require("web3")
var EthereumTransaction = require("ethereumjs-tx")
var web3 = new Web3('HTTP://127.0.0.1:8545')

// Available Accounts 8545
// ==================
// (0) 0x3e0421fe524d95f3ffc0557d0c9fabb587adc99f (~100 ETH)
// (1) 0x784754c5f84dbeb1b8f48431d6360901437a492a (~100 ETH)
// (2) 0x55196d314ba88280fc2d5d23dff1a7782ceae2ab (~100 ETH)
// (3) 0x9e8bc2414b12f98ac1d476d5319325fe1069fdb6 (~100 ETH)
// (4) 0xaed03bf1a57fbd5ba20ca5cbcf4bc53aba01c28c (~100 ETH)
// (5) 0xd2e498ad55c98380c2bda04337baeaf5e690a1f3 (~100 ETH)
// (6) 0x6feaedecd45168cf1c8ea2326eea62edd3db5b7c (~100 ETH)
// (7) 0x85d5070302747853b6813180f5e81cd160477d32 (~100 ETH)
// (8) 0xd1f3a867093772ba3cf55a012711c6f506ade188 (~100 ETH)
// (9) 0xa64fe0d58c7ec1b4ab3b985135cb57735bd0aa3e (~100 ETH)

// Private Keys
// ==================
// (0) 0x19cdb31889a19b9bed17db7b39f329b9501d408d8f9c7fbaae215dd8ef15772d
// (1) 0x8fad04e2ab2d6e88859a1552c986fd7cfc228988fb3b7c25885e70ed25fdcdc0
// (2) 0x7407a667ae8fcfe8220580481077de99fd5dae3fdcd05840c8f866c78845102b
// (3) 0xf1567060b93b476c8bc220d839be1c6358dbc67b54a2020c58006e626568d3aa
// (4) 0x442ca64a40f1030ba29f0007c1f2a9f539f2ce2c83eaecbe8e65c1a4c4e68e65
// (5) 0x0f550ab2571cffcda9fee26be5dcdd62c6f0a7a6ec466ea2958fb3a51a881a2d
// (6) 0x5cb53c188acadf2c4058c95fd3d01be617a4a727cdc4220e9f43e6ad133fb43e
// (7) 0x428a2d452cf8825085fa00646f60a91038a9fbc0c96218624deec919b26cfcf4
// (8) 0x23fe4f495644aef14c2596a008ad40a58fe80e2006cd4bed97d8a6c8635da603
// (9) 0xddf377ff1f752b129c2b08180f94204856628228c9151b815ea458f310fe403b

// -- Step 2: Set the sending and receiving addresses for the transaction.
var sendingAddress = '0x3e0421fe524d95f3ffc0557d0c9fabb587adc99f'
var receivingAddress = '0x784754c5f84dbeb1b8f48431d6360901437a492a'

// -- Step 3: Check the balances of each address
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)

/*##########################
##  CREATE A TRANSACTION  ##
##########################*/

// -- Step 4: Set up the transaction using the transaction variables as shown
var rawTransaction = {
    nonce: 0,
    to: receivingAddress,
    gasPrice: 20000000,
    gasLimit: 30000,
    value: 1000000000000000000,
    data: ""
}

// -- Step 5: View the raw transaction
console.log(rawTransaction);

// -- Step 6: Check the new account balances (they should be the same)
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)

// Note: They haven't changed because they need to be signed...

/*##########################
##  Sign the Transaction  ##
##########################*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender
var privateKeySender = '19cdb31889a19b9bed17db7b39f329b9501d408d8f9c7fbaae215dd8ef15772d'
var privateKeySenderHex = new Buffer(privateKeySender, 'hex')
var transaction = new EthereumTransaction(rawTransaction)
transaction.sign(privateKeySenderHex)

/*#########################################
##  Send the transaction to the network  ##
#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network.
var serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);