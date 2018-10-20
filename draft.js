this.getBlockHeight().then((height)=>{

    // UTC timestamp
    newBlock.time = new Date().getTime().toString().slice(0,-3);

    //assign the value to the height
    newBlock.height = height+1;
    console.log('new block height = ' + newBlock.height);

    //assign the value to previous Block hash
    if(height>0){
      this.getBlock(height-1).then((preBlock)=>{
        console.log(preBlock);
        this.previousBlockHash = preBlock.hash;
      });

    console.log('new block previousBlockHash = ' + newBlock.previousBlockHash);
    
    // Block hash with SHA256 using newBlock and converting to a string
    //Warning!! this line must run when the block data prepared.
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    
    // Adding block object to chain
    //this.chain.push(newBlock);
    this.chainDB.addLevelDBData(newBlock.height,newBlock);