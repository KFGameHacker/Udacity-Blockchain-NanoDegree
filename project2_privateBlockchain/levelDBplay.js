var level = require('level')
const db = level('./chainDB')

function addData(key,value){
    let self = this;
    return new Promise((resolve,reject)=>{
        db.put(key,value,(err)=>{
            if(err){
                console.log('Key:'+ key + "insert error");
                reject(err);
            }
            resolve(value);
        });
    });
};

function getData(key){
    return new Promise((resolve,reject)=>{
        db.get(key,(err,value)=>{
            if(err){
                console.log('get data by key' + key + 'failed');
                reject(err);
            }
            resolve(value);
        });
    });
}


function getDBCounter(){
    let counter = 0;
    return new Promise((resolve,reject)=>{
        db.createReadStream()
        .on('data',(data)=>{
            console.log(data.key + ':' + data.value);
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

getDBCounter().then((height)=>{console.log("---- chainDB height = " + height + " ---")})