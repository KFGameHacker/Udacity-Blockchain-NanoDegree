const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./Block.js');
const SimpleChain = require('./simpleChain.js').SimpleChain;

//Controller Definition to encapsulate routes to work with the blockchain
class BlockConctroller{
    
    constructor(app){
        this.app = app;
        this.blockchain = new SimpleChain();
        this.getBlockByIndex();
        this.postNewBlock();
    }

    //get Block By Index through API
    getBlockByIndex(){
        this.app.get('/api/block/:index',(req,res)=>{
            let index = req.params.index;
            this.blockchain.getBlock(index).then(blockStr=>{
                res.send(blockStr);
            });
        });
    }

    //add a Block to chian through API
    postNewBlock(){
        this.app.post('/api/block',(req,res)=>{
            let data = req.body.data.toString();
            let newBlock = new BlockClass.Block(data);
            this.blockchain.addBlock(newBlock).then(result=>{
                res.setHeader('Content-Type','text/plain');
                res.write('you posted:\n');
                res.end(JSON.stringify(newBlock).toString());
            });
        })
    }
}

module.exports = (app)=>{return new BlockConctroller(app);}