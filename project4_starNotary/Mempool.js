//build a mempool to store middle process validation data

const VALID_DURATION_MS = 300000;

class Mempool{
    
    //init the class
    constructor(){
        this.mempool = [];
        this.timeoutRequests = [];
    }

    //add user request to the mempool array
    addRequestValidation(request){
        let address = request.body.address.toString();
        let requestTimeStamp = new Date().getTime().toString().slice(0, -3);
        let message = `${address}:${requestTimeStamp}:starRegistry`;
        let validationWindow = 300;
        let requestObject = {
            "walletAddress": address,
            "requestTimeStamp": requestTimeStamp,
            "message": message,
            "validationWindow": validationWindow
        }
        this.mempool.push(requestObject);
        this.showMempool();
        //start the timer
        //this.setTimeOut(requestObject,validationWindow);
        return requestObject;
    }
    
    //loop the mempool and display it
    showMempool(){
        console.log('================ mempool start =========');
        this.mempool.forEach((value=>{
            console.log(value);
        }))
        console.log('================ mempool end =========');
    }

    //set a timer to calc the timeout request
    setTimeOut(request,TimeoutRequestsWindowTime){
        this.timeoutRequests[request.walletAddress]=setTimeout(function(){
            this.removeValidationRequest(request.walletAddress)},TimeoutRequestsWindowTime
        );
    }

    //move expired request from mempool to timeoutRequests array
    removeValidationRequest(WalletAddress){

    }

    //Get the "now" UTC timestamp.
    getNowTimestamp() {
    return new Date().getTime().toString();
    }
}

exports.Mempool = Mempool;