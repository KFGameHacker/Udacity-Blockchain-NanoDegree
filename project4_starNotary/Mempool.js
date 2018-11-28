const bitcoinMessage = require('bitcoinjs-message');
//build a mempool to store middle process validation data

const TimeoutRequestsWindowTime = 5*60;

class Mempool{
    
    //init the class
    constructor(){
        //init the mempool with array
        this.mempool = [];
        //init the timeoutRequests pool with array
        this.timeoutRequests = [];
        //valid mempool array
        this.mempoolValid = [];
    }

    //add user request to the mempool array
    addRequestValidation(request){
        return new Promise((resolve,reject)=>{
            let address = request.body.address.toString();       
            let requestTimeStamp,message,validationWindow,requestObject;

            //check if request is in the mempool already
            this.searchPoolByAddress(this.mempool,address).then(result=>{

                //if not in mempool
                if(result=='not found'){

                    //build the requestObject structure
                    requestTimeStamp = new Date().getTime().toString().slice(0, -3);
                    message = `${address}:${requestTimeStamp}:starRegistry`;
                    validationWindow = TimeoutRequestsWindowTime;
                    requestObject = {
                        "walletAddress": address,
                        "requestTimeStamp": requestTimeStamp,
                        "message": message,
                        "validationWindow": validationWindow,
                        "timeLeft":validationWindow
                    }
                    let reqStr = JSON.stringify(requestObject).toString();
                    this.mempool.push(reqStr);

                    //set a internal timer to remove the address from mempool after 5 minutes
                    setTimeout(()=>{
                        this.removeValidationRequest(address);
                    },TimeoutRequestsWindowTime*1000);

                    resolve(reqStr);
                }
                //if in mempool
                else if(result){
                    //defind variables for time calculation
                    let timeLeft,timeElapsed;
                    requestTimeStamp = result.requestTimeStamp;
                    timeElapsed = this.getNowTimestamp()-requestTimeStamp;
                    timeLeft = TimeoutRequestsWindowTime - timeElapsed;

                    //if user request expired,remove it from the mempool
                    if(timeLeft<=0){
                        this.removeValidationRequest(address);
                        result.expired = 'true';
                        resolve(JSON.stringify(result).toString());
                    }else{
                        result.timeLeft = timeLeft;
                        resolve(JSON.stringify(result).toString());
                    }
                    //this.showMempool();
                }
            }).catch(error=>{
                reject('error:'+error);
            });
        });
    }

    //validate the user signature
    validateRequestByWallet(request){
        return new Promise((resolve,reject)=>{
            let address = request.body.address.toString();
            let signature = request.body.signature.toString();
            //console.log(`${address}:${signature}`);

            //check user request address is in the mempool
            this.searchPoolByAddress(this.mempool,address).then(result=>{

                //if not in the mempool
                if(result=='not found'){
                    reject('not found in the mempool.');
                }
                //if in the mempool
                else if(result){
                let validReqObj;
                //validate the user post signatue
                let isValid = bitcoinMessage.verify(result.message,address,signature);

                if(isValid){
                    //if it's valid,we archive it to valid pool
                    result.messageSignature = 'valid';
                    delete result.timeLeft;
                    validReqObj = {
                        registerStar : true,
                        status : result,
                    }
                    this.archiveValidRequest(address);
                    resolve(JSON.stringify(validReqObj).toString());
                }
                resolve(isValid);
                }
            }).catch(error=>{
                reject('error:'+error);
            });
        });
    }

     //search the mempool by wallet address
     searchPoolByAddress(pool,address){
        return new Promise((resolve,reject)=>{
            
            //search the mempool by loop
            pool.forEach((itemStr=>{

                //parse str to json object
                let item = JSON.parse(itemStr);

                if(item.walletAddress == address){
                resolve(item);
                }
            }))
            resolve('not found');
        });
    }

    //query the specific request pool
    showPool(pool){
        console.log('================ pool head =========================');
        pool.forEach((item=>{
            console.log(item);
        }))
        console.log('====================================================');
    }

    //move expired request from mempool to timeoutRequests array
    removeValidationRequest(walletAddress){
        this.searchPoolByAddress(this.mempool,walletAddress).then(result=>{
            let resultStr = JSON.stringify(result).toString();
            let resultIndex = this.mempool.indexOf(resultStr);
            //move timedOut request from mempool to timeoutRequests array
            this.timeoutRequests.push(this.mempool.splice(resultIndex,1));
        }).catch(error=>{
            console.log(error);
        });
    }

    //move valid requests from mempool to valid pool.
    archiveValidRequest(walletAddress){
        this.searchPoolByAddress(this.mempool,walletAddress).then(result=>{
            let resultStr = JSON.stringify(result).toString();
            let resultIndex = this.mempool.indexOf(resultStr);
            //move timedOut request from mempool to timeoutRequests array
            this.mempoolValid.push(this.mempool.splice(resultIndex,1));
        }).catch(error=>{
            console.log(error);
        });
    }

    //Get the "now" UTC timestamp.
    getNowTimestamp() {
    return new Date().getTime().toString().slice(0,-3);
    }
}

exports.Mempool = Mempool;