const express = require('express');
const bodyParser = require('body-parser');

class BlockAPI{
    constructor(){
        this.app = express();
        this.initExpress();
        this.initExpressMiddleWare();
        this.initControllers();
        this.start();
    }

    initExpress(){
        this.app.set('port',8000);
    }

	initExpressMiddleWare() {
		this.app.use(bodyParser.urlencoded({extended:true}));
		this.app.use(bodyParser.json());
	}

    initControllers(){
        require('./BCController.js')(this.app);
    }

    start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log(`Server Listening for port: ${this.app.get('port')}`);
        })
    }
}

exports.BlockAPI = BlockAPI;
//new BlockAPI();