const SHA256 = require('crypto-js/sha256');
const Block = require('./Block.js').Block;
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
                if(blockStr!=null){
                    res.setHeader('Content-Type','text/json');
                    res.send(blockStr);
                }else{
                    res.send("not found.");
                }
            });
        });
    }

    //add a Block to chain through API
    postNewBlock(){
        this.app.post('/api/block',(req,res)=>{
            let req_data = req.body.info.toString();
            let newBlock = new Block(req_data);
            this.blockchain.addBlock(newBlock).then(result=>{
                res.setHeader('Content-Type','text/json');
                res.write('you posted:\n');
                res.end(JSON.stringify(newBlock).toString());
            });
        })
    }
}

module.exports = (app)=>{return new BlockConctroller(app);}