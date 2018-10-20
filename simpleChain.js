/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelDBHandler = require('./LevelDBHandler')

/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

class Block{
	constructor(data){
     this.hash = "",
     this.height = 0,
     this.body = data,
     this.time = 0,
     this.previousBlockHash = ""
    }
}

/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain{
  constructor(){
    //this.chain = [];
    this.chainDB = new LevelDBHandler();

    this.getBlockHeight().then((height)=>{
      if(height===0){
        //create the Genesis Block
        this.createGenesisBlock();
      }
    });
  }

  //to create the Genesis Block
  createGenesisBlock(){
    let GenesisBlock = new Block("There should be light. - Genesis Block");
    this.chainDB.addLevelDBData('0',JSON.stringify(GenesisBlock).toString())
    console.log('Genesis Block Created.');
  }

  // Add new block
  addBlock(newBlock){
      return new Promise((resolve,reject)=>{

        this.getBlockHeight().then((height)=>{

          //assign height
          newBlock.height = height+1;

          //assign preBlockHash
          if(height>0){
            this.getBlock(height-1).then((preBlock)=>{
              //let preBlock = JSON.parse(preBlockString);
              newBlock.previousBlockHash = preBlock.hash;
            });
          }

        });
      
        //assign UTC timestamp
        newBlock.time = new Date().getTime().toString().slice(0,-3);

        // Block hash with SHA256 using newBlock and converting to a string
        //Warning!! this line must run when the block data prepared.
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();

        //add to blockchain databse
        this.chainDB.addLevelDBData(newBlock.height,newBlock);
        resolve(newBlock);
      });
    }

  // Get block height
  getBlockHeight(){
    return this.chainDB.getDBCounter();
  }

  // get block
  getBlock(blockHeight){
    return this.chainDB.getLevelDBData(blockHeight);
  }

  // validate block
  validateBlock(blockHeight){
    // get block object
    let block = this.getBlock(blockHeight);
    // get block hash
    let blockHash = block.hash;
    // remove block hash to test block integrity
    block.hash = '';
    // generate block hash
    let validBlockHash = SHA256(JSON.stringify(block)).toString();
    // Compare
    if (blockHash===validBlockHash) {
        return true;
      } else {
        console.log('Block #'+blockHeight+' invalid hash:\n'+blockHash+'<>'+validBlockHash);
        return false;
      }
  }

  // Validate blockchain
  validateChain(){
    let errorLog = [];
    for (var i = 0; i < this.chain.length-1; i++) {
      // validate block
      if (!this.validateBlock(i))errorLog.push(i);
      // compare blocks hash link
      let blockHash = this.chain[i].hash;
      let previousHash = this.chain[i+1].previousBlockHash;
      if (blockHash!==previousHash) {
        errorLog.push(i);
      }
    }
    if (errorLog.length>0) {
      console.log('Block errors = ' + errorLog.length);
      console.log('Blocks: '+errorLog);
    } else {
      console.log('No errors detected');
    }
  }
}

let myChain = new Blockchain();
// myChain.addBlock(new Block('love')).then((Block)=>{
//   console.log(Block);
// });
// myChain.addBlock(new Block('peace')).then((Block)=>{
//   console.log(Block);
// });
// myChain.addBlock(new Block('freedom')).then((Block)=>{
//   console.log(Block);
// });