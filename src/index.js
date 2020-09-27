const express=require('express');
const logger=require('winston');
const logging=require('./startup/logging');
const routes=require('./startup/routes');
const database=require('./startup/db');
const config = require('config');


const app=express();

process.env.NODE_ENV=app.get('env');

logging.initializeLogger();


database.initializeDB();

routes.initializeRoutes(app);

logger.info(`environment :`+process.env.NODE_ENV);






const port=config.get('port');
const server= app.listen(port, () => {logger.info(`listening on port ${port}...`);});

module.exports=server;