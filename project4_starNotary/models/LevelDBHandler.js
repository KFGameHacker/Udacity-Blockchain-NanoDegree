/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

// Importing the module 'level'
const level = require('level');
// Declaring the folder path that store the data
const chainDB = './chainDB';
// Declaring a class

class LevelDBHandler {
	// Declaring the class constructor
    constructor() {
    	this.db = level(chainDB);
    }
  
  	// Get data from levelDB with key (Promise)
  	getLevelDBData(key){
        let self = this; // because we are returning a promise we will need this to be able to reference 'this' inside the Promise constructor
        return new Promise((resolve, reject)=>{
            self.db.get(key, (err, value) => {
                if(err){
                    if (err.type == 'NotFoundError') {
                        resolve(undefined);
                    }else {
                        console.log('Block ' + key + ' get failed', err);
                        reject(err);
                    }
                }else {
                    resolve(value);
                }
            });
        });
    }
  
  	// Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        let self = this;
        return new Promise((resolve, reject)=>{
            self.db.put(key, value, (err)=>{
                if (err) {
                    console.log('Block ' + key + ' submission failed', err);
                    reject(err);
                }
                resolve(value);
            });
        });
    }
    
    //Get the count the number of the whole levelDB
    getDBCounter(){
    let counter = 0;
    let self = this;
    return new Promise((resolve,reject)=>{
        self.db.createReadStream()
        .on('data',(data)=>{
            //console.log(data.key + '=' + data.value);
            counter++;
        })
        .on('error',(err)=>{
            console.log('Oh my!', err);
            reject(err);
        })
        .on('close',()=>{
            //console.log('Stream closed');
        })
        .on('end',()=>{
            //console.log('Stream ended');
            resolve(counter);
        })
    });
    }

    // Get block by hash
    getDataByHash(hash) {
        let block = null;
        let self = this;
        return new Promise(function(resolve, reject){
            self.db.createReadStream()
            .on('data', dataStr=>{
                let data = JSON.parse(dataStr.value);
                //console.log(data);
                if(data.hash === hash){
                    block = data;
                }
            })
            .on('error',err=>{
                reject(err)
            })
            .on('close',()=>{
                resolve(block);
            });
        });
    }

    // Get block by address
    getDataByAddress(address) {
        let block = null;
        let self = this;
        return new Promise(function(resolve, reject){
            self.db.createReadStream()
            .on('data', dataStr=>{
                let data = JSON.parse(dataStr.value);
                //console.log(data);
                if(data.body.address === address){
                    block = data;
                }
            })
            .on('error',err=>{
                reject(err)
            })
            .on('close',()=>{
                resolve(block);
            });
        });
    }
}

// Export the class
module.exports = LevelDBHandler;