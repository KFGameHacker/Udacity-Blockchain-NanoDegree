const Block = require('./Block.js').Block;
const SimpleChain = require('./simpleChain.js').SimpleChain;
const Mempool = require('./Mempool').Mempool;

//Controller Definition to encapsulate routes to work with the blockchain
class BlockConctroller{
    
    constructor(app){
        this.app = app;
        this.blockchain = new SimpleChain();
        this.mempool = new Mempool();
        this.getBlockByIndex();
        this.postNewBlock();
        this.postRequestValidation();
        this.getTimeoutReqPool();
        this.getMempool();
        this.getValidPool();
        this.postUserSignature();
        this.postStar();
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

    //request validation
    postRequestValidation(){
        this.app.post('/requestValidation',(req,res)=>{
            this.mempool.addRequestValidation(req).then(result=>{
                //console.log(result);
                res.setHeader('Content-Type','text/json');
                res.end(result);
            }).catch(error=>{
                console.log(error);
            });
        })
    }

    //query the Timeout request pool for debug
    getTimeoutReqPool(){
        this.app.post('/getTimeoutRequests',(req,res)=>{
            this.mempool.showPool(this.mempool.timeoutRequests);
            res.end("hello");
        });
    }

    //query the mempool for debug
    getMempool(){
        this.app.post('/getMempool',(req,res)=>{
            this.mempool.showPool(this.mempool.mempool);
            res.end("hello");
        });
    }

    //query the valid mempool for debug
    getValidPool(){
        this.app.post('/getValidPool',(req,res)=>{
            this.mempool.showPool(this.mempool.mempoolValid);
            res.end("hello");
        });
    }

    //request validation
    postUserSignature(){
        this.app.post('/message-signature/validate',(req,res)=>{
            this.mempool.validateRequestByWallet(req).then(result=>{
                res.setHeader('Content-Type','text/json');
                res.end(result.toString());
            }).catch(error=>{
                res.end(error);
            });
        })
    }

    //user post star data
    postStar(){
        this.app.post('/postStar',(req,res)=>{
            // let body = {
            //     address: req.body.address,
            //     star: {
            //           ra: RA,
            //           dec: DEC,
            //           mag: MAG,
            //           cen: CEN,
            //           story: Buffer(starStory).toString('hex')
            //           }
            //     }
            //check user request address is in the valid mempool
            this.mempool.searchPoolByAddress(this.mempool.mempoolValid,req.body.address).then(result=>{
                if(result=='not found'){
                    res.end(req.body.address+' not in valid mempool.');
                }else if(result){
                    res.setHeader('Content-Type','text/json');
                    res.end("hey");
                }
            }).catch(error=>{
                res.end(error);
            });
        });
    }
}

module.exports = (app)=>{return new BlockConctroller(app);}