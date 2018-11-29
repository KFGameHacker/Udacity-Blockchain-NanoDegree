const Block = require('../models/Block.js').Block;
const SimpleChain = require('../models/simpleChain.js').SimpleChain;
const Mempool = require('../models/Mempool').Mempool;
const hex2ascii = require('hex2ascii');

//Controller Definition to encapsulate routes to work with the blockchain
class BlockConctroller{
    
    constructor(app){
        this.app = app;
        this.blockchain = new SimpleChain();
        this.mempool = new Mempool();
        //reg end points.
        this.getBlockByIndex();
        this.getBlockByHash();
        this.getBlockByAddress();

        this.postRequestValidation();
        this.postUserSignature();
        this.postStar();
    }

    //get Block By Index through API
    getBlockByIndex(){
        this.app.get('/block/:index',(req,res)=>{
            let index = req.params.index;
            this.blockchain.getBlock(index).then(blockStr=>{
                if(blockStr!=null){
                    let Block = JSON.parse(blockStr);

                    //if not genesis block,decode the star story
                    if(index!=0){
                        Block.body.star.storyDecoded = hex2ascii(Block.body.star.story);
                    }
                    res.setHeader('Content-Type','text/json');
                    res.send(JSON.stringify(Block).toString());
                }else{
                    res.send("not found.");
                }
            });
        });
    }

    //get Block By Index through API
    getBlockByHash(){
        this.app.get('/stars/hash::hash',(req,res)=>{
            let hash = req.params.hash;

            //check user post hash is valid
            if(hash.length!=64){
                res.end('Your hash is wrong.please check.');
            }
            this.blockchain.getBlockByHash(hash).then(block=>{
                 //if not genesis block,decode the star story
                if(block.height!=0){
                    block.body.star.storyDecoded = hex2ascii(block.body.star.story);
                }

                res.setHeader('Content-Type','text/json');
                res.send(JSON.stringify(block).toString());
            }).catch(error=>{
                res.end(error.toString());
            });
        })
    };

    //get Block By Index through API
    getBlockByAddress(){
        this.app.get('/stars/address::address',(req,res)=>{
            let address = req.params.address;
            //check user post hash is valid
            if(address.length!=34){
                res.end('Your address is wrong.please check.');
            }

            this.blockchain.getBlockByAddress(address).then(block=>{
                 //if not genesis block,decode the star story
                if(block.height!=0){
                    block.body.star.storyDecoded = hex2ascii(block.body.star.story);
                }

                res.setHeader('Content-Type','text/json');
                res.send(JSON.stringify(block).toString());
            }).catch(error=>{
                res.end(error.toString());
            });
        })
    };

    //request validation
    postRequestValidation(){
        this.app.post('/requestValidation',(req,res)=>{
            this.mempool.addRequestValidation(req).then(result=>{
                //console.log(result);
                res.setHeader('Content-Type','text/json');
                res.end(result);
            }).catch(error=>{
                res.end(error);
            });
        })
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
        this.app.post('/block',(req,res)=>{

            //check user post is null?
            if(!req.body){
                res.status(400).json({
                    success: false,
                    message: "Please check your request, which might be empty, undefined, or in a wrong format."
                  })
            }else{

                //assign value
                let address = req.body.address;
                let RA = req.body.star.ra;
                let DEC = req.body.star.dec;
                let MAG = req.body.star.mag;
                let CEN = req.body.star.cen;
                let story = req.body.star.story;

                let isStoryTooLong = story.length>500?true:false;
                let isStoryASCII = /^[\x00-\x7F]*$/.test(story);

                //check user post story
                if(isStoryTooLong){
                    res.end('Your star story is wrong.please check.');
                }

                //check user post story
                if(!isStoryASCII){
                    res.end('Your star story is not ASCII.please check.');
                }

                //check user post star parameter
                if(!RA||!DEC){
                    res.end('Your star parameter is wrong.please check.');
                }

                let body = {
                    address: address,
                    star: {
                        ra: RA,
                        dec: DEC,
                        mag: MAG,
                        cen: CEN,
                        story: Buffer.from(story,'ascii').toString('hex')
                        }
                }
                //res.end(JSON.stringify(body).toString());
                //check user request address is in the valid mempool
                this.mempool.searchPoolByAddress(this.mempool.mempoolValid,req.body.address).then(result=>{
                    if(result=='not found'){
                        res.end(req.body.address+' not in valid mempool.');
                    }else if(result){
                        //remove user valid request after post star data.
                        this.mempool.removeElementFromPool(this.mempool.mempoolValid,address).then(result=>{

                        //if remove success
                        if(result){
                            let newBlock = new Block(body);
                            this.blockchain.addBlock(newBlock).then(result=>{
                                res.setHeader('Content-Type','text/json');
                                newBlock.body.star.storyDecoded = hex2ascii(newBlock.body.star.story);
                                
                                res.end(JSON.stringify(newBlock).toString());
                        });
                    }
                        });
                    }
                }).catch(error=>{
                    res.end(error);
                });
                }
        });
    }
}

module.exports = (app)=>{return new BlockConctroller(app);}