var SHA256 = require('crypto-js/sha256')


class Block{
  constructor(data){
    this.hash = '';
    this.height = '';
    this.body = data;
    this.time = '';
    this.previousblockhash = "0x";
  }
}

class BlockChain{
	constructor(){
      this.chain = [];
      this.addNewBlockchain(this.createGenesisBlock());
    }

    //create the Genesis Block
    createGenesisBlock(){
      return new Block('There should be light. - Genesis Block');
    }
  
  	addNewBlockchain(newBlock){

      //get the blockchain height
      newBlock.height = this.chain.length;

      //UTCtimestamp
      newBlock.time = new Date().getTime().toString().slice(0,-3);

      //get the hash of previous block
      if(this.chain.length>0){
        newBlock.previousblockhash = this.chain[this.chain.length-1].hash;
      }

      //calculte the HASH of new block
      newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();

      //add block to the chain
      this.chain.push(newBlock);
    }
}

let myChain = new BlockChain();
myChain.addNewBlockchain(new Block('Peace'));
myChain.addNewBlockchain(new Block('Love'));
console.log(myChain.chain);
