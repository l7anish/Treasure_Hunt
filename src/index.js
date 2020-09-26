const express=require('express');
const logger=require('winston');
const logging=require('./startup/logging');
const routes=require('./startup/routes');
const database=require('./startup/db');
const config = require('config');


const app=express();


database.initializeDB();

routes.initializeRoutes(app);

logging.initializeLogger();




const port=config.get('port');
const server= app.listen(port, () => {logger.info(`listening on port ${port}...`);});

module.exports=server;