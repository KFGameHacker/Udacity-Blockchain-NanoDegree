//build a mempool to store middle process validation data

const TimeoutRequestsWindowTime = 5*60;

class Mempool{
    
    //init the class
    constructor(){
        //init the mempool with array
        this.mempool = [];
        //init the timeoutRequests pool with array
        this.timeoutRequests = [];
    }

    //add user request to the mempool array
    addRequestValidation(request){
        return new Promise((resolve,reject)=>{
            let address = request.body.address.toString();       
            let requestTimeStamp,message,validationWindow,requestObject;
            //check if request is in the mempool already
            this.searchMempoolByAddress(address).then(result=>{

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
                        "validationWindow": validationWindow
                    }
                    let reqStr = JSON.stringify(requestObject).toString();
                    this.mempool.push(reqStr);
                    this.showMempool();
                    this.showtTimeoutRequests();
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
                console.log('error:'+error);
            });
        });
    }

    //search the mempool by wallet address
    searchMempoolByAddress(address){
        return new Promise((resolve,reject)=>{
            
            //search the mempool by loop
            this.mempool.forEach((itemStr=>{

                //parse str to json object
                let item = JSON.parse(itemStr);

                if(item.walletAddress == address){
                resolve(item);
                }
            }))
            resolve('not found');
        });
    }

    //loop the mempool and display it
    showMempool(){
        console.log('================ mempool head =========');
        this.mempool.forEach((item=>{
            console.log(item);
        }))
        console.log('================ mempool tail =========');
    }

    //loop the timeoutRequests array and display it
    showtTimeoutRequests(){
        console.log('================ timeout request pool head =========');
        this.timeoutRequests.forEach((item=>{
            console.log(item);
        }))
        console.log('================ timeout request pool tail =========');
    }

    //move expired request from mempool to timeoutRequests array
    removeValidationRequest(walletAddress){
        this.searchMempoolByAddress(walletAddress).then(result=>{
            let resultStr = JSON.stringify(result).toString();
            let resultIndex = this.mempool.indexOf(resultStr);
            //move timedOut request from mempool to timeoutRequests array
            this.timeoutRequests.push(this.mempool.splice(resultIndex,1));
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