//build a mempool to store middle process validation data

const TimeoutRequestsWindowTime = 5*60*1000;

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
            this.searchMempoolByAddress(address).then(result=>{
                if(result=='not found'){

                    //build the requestObejct structure
                    let requestTimeStamp = new Date().getTime().toString().slice(0, -3);
                    let message = `${address}:${requestTimeStamp}:starRegistry`;
                    let validationWindow = 300;
                    let requestObject = {
                        "walletAddress": address,
                        "requestTimeStamp": requestTimeStamp,
                        "message": message,
                        "validationWindow": validationWindow
                    }
                    let reqStr = JSON.stringify(requestObject).toString();
                    this.mempool.push(reqStr);
                    this.setTimeOut(requestObject,validationWindow);
                    //this.showMempool();
                    //this.showtTimeoutRequests();
                    resolve(reqStr);
                }
                else if(result){
                    resolve("{'error':'address already in the mempool!'}");
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

    //set a timer to calc the timeout request
    setTimeOut(request,TimeoutRequestsWindowTime){
        this.timeoutRequests[request.walletAddress]=setTimeout(function(){
            console.log('timeOutttt!!');
            this.removeValidationRequest(request.walletAddress)},TimeoutRequestsWindowTime);
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
    return new Date().getTime().toString();
    }
}

exports.Mempool = Mempool;