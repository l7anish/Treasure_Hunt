const express=require('express');
const logger=require('winston');
const logging=require('./startup/logging');
const routes=require('./startup/routes');
const database=require('./startup/db');
const config = require('config');
const initializeProductionSetup=require('./startup/prod');
const cors=require('cors');


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





const port=config.get('port');
const server= app.listen(port, () => {logger.info(`listening on port ${port}...`);});

module.exports=server;