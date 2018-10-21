var level = require('level')

// 1) Create our database, supply location and options.
//    This will create or open the underlying LevelDB store.
const db = level('./chainDB')

// 2) Put a key & value
// db.put('name', 'Level', function (err) {
//   if (err) return console.log('Ooops!', err) // some kind of I/O error

//   // 3) Fetch by key
//   db.get('name', function (err, value) {
//     if (err) return console.log('Ooops!', err) // likely the key was not found

//     // Ta da!
//     console.log('name=' + value)
//   })
// })

// db.put('kevin','awesome',function(err){
//   if(err) return console.log('wrong',err);
//   console.log('Input DB success.');
// })

// db.get('kevin',function(err,value){
//   if(err) return console.log('wrong',err);
//   console.log('kevin:' + value);
// }) 

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

// addData(1,'kevin');
// addData(2,'barlow');
// getData('1').then((value)=>{console.log(value)});
// getData('2').then((value)=>{console.log(value)});
// addData('3','kk');
// addData('4','sdfs');
// addData('5','baetetrerlow');
getDBCounter().then((height)=>{console.log("---- chainDB height = " + height + " ---")})