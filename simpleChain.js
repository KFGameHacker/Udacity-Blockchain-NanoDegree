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
    GenesisBlock.time = new Date().getTime().toString().slice(0, -3);
    GenesisBlock.hash = SHA256(JSON.stringify(GenesisBlock)).toString();
    this.chainDB.addLevelDBData(0,JSON.stringify(GenesisBlock).toString()).then((Block)=>{
      console.log('Genesis Block Created.');
      console.log(Block);
    });
  }

  // Add new block
  addBlock(newBlock){
      return new Promise((resolve,reject)=>{

        this.getBlockHeight().then((chainHeight)=>{

          if(chainHeight==0){
            //create the Genesis Block
            this.createGenesisBlock();
            reject(chainHeight)
          }

          //assign height
          newBlock.height = chainHeight;

          //assign preBlockHash
          if(chainHeight>0){
            this.getBlock(chainHeight-1).then((preBlockString)=>{
              let preBlock = JSON.parse(preBlockString);
              newBlock.previousBlockHash = preBlock.hash;

              //assign UTC timestamp
              newBlock.time = new Date().getTime().toString().slice(0,-3);

              // Block hash with SHA256 using newBlock and converting to a string
              //Warning!! this line must run when the block data prepared.
              newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();

              //add to blockchain databse
              this.chainDB.addLevelDBData(newBlock.height,JSON.stringify(newBlock).toString());
              resolve(newBlock);
              });
          }
        });
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
    return new Promise((resolve,reject)=>{
      // get block object
    this.getBlock(blockHeight).then(function (response) {

    let block = JSON.parse(response);
    // get block hash
    let blockHash = block.hash;
    block.hash = '';
    let validBlockHash = SHA256(JSON.stringify(block)).toString();

    // Compare
    if (blockHash === validBlockHash) {
      console.log('Block #' + blockHeight + ' validated. \nhash:\n' + blockHash + '\n==\n' + validBlockHash);
      resolve(true);
    } else {
      console.log('Block #' + blockHeight + ' invalid hash:\n' + blockHash + '<>' + validBlockHash);
      reject(false);
    }
    }).catch(err=>{
      console.log('Get Block #'+blockHeight+' err:'+err);
      reject(err);
    });
  });
}

  // Validate blockchain
  validateChain(){
    let errorLog = [];
    let validQueue = [];
    this.getBlockHeight().then(blockHeight=>{

      for(let i=0;i<=blockHeight-1;i++){

        this.getBlock(i).then(blockStr=>{

          let block = JSON.parse(blockStr);
          validQueue.push(this.validateBlock(i));

        }).catch(err=>{
          errorLog.push(err);
          console.log(err);
        });
      }

      Promise.all(validQueue).then(result=>{
        console.log('Valid Queue validated.' + result);
      }).catch(err=>{
        console.log(err);
      })
    });
  }
}

//Test Case
let myBlockChain = new Blockchain();

// (function theLoop (i) {
//   setTimeout(function () {
//       let blockTest = new Block("Test Block - " + (i + 1));
//       myBlockChain.addBlock(blockTest).then((result) => {
//           console.log(result);
//           i++;
//           if (i < 10) theLoop(i);
//       }).catch(err=>{
//         console.log(err);
//       });
//   }, 5000);
// })(0);

//setTimeout(() => myBlockChain.validateChain(), 2000)
// myBlockChain.validateBlock(2).then((validation)=>{
//   console.log(validation)
// })
myBlockChain.validateChain()