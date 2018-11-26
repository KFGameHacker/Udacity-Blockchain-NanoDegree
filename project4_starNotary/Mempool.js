//build a mempool to store middle process validation data

const VALID_DURATION_MS = 300000;

class Mempool{
    
    //init the class
    constructor(){
        this.mempool = [];
        this.timeoutRequests = [];
    }

    addRequestValidation(request){
        this.mempool.push(request);
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
        return requestObject;
    }
    
    //Get the "now" UTC timestamp.
     getNowTimestamp() {
    return new Date().getTime().toString();
    }
}

exports.Mempool = Mempool;