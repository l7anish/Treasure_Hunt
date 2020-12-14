const express=require('express');
const logger=require('winston');
const logging=require('./startup/logging');
const routes=require('./startup/routes');
const database=require('./startup/db');
const config = require('config');
const initializeProductionSetup=require('./startup/prod');
const cors=require('cors');
const fs =require('fs');
const https=require('https');


const app=express();

app.use(cors());

process.env.NODE_ENV=app.get('env');

logging.initializeLogger();
logger.info(`environment :`+process.env.NODE_ENV);

database.initializeDB();

routes.initializeRoutes(app);

if(app.get('env') === 'production'){
    logger.info(`Initializing production setup`)
    initializeProductionSetup(app);
}

var server;
const port=config.get('port');


if(app.get('env') === 'production'){
    logger.info(`Securing network traffic`);

    const sslOptions={
        key: fs.readFileSync(config.get('privateKeyPath'),'utf-8'),
        certificate: fs.readFileSync(config.get('certificatePath'),'utf-8')
    };
    server=https.createServer(sslOptions,app).listen(port,()=>{logger.info(`listening on port ${port}...`);});

}else{
    server= app.listen(port, () => {logger.info(`listening on port ${port}...`);});
}

module.exports=server;