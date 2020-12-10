const mongoose = require('mongoose');
const config=require('config');
const logger=require('winston');

exports.initializeDB=()=>{

    if(process.env.NODE_ENV==='test'){
        return; //Do not initialise db in test environment
    }

    let db=config.get('db');
    const dbUser=config.get('dbUser');
    const dbPassword=config.get('dbPassword');

    if(process.env.NODE_ENV === 'production'){
        logger.info('Initialising db for PRODUCTION environment');
        logger.info(`Database name ${dbUser}`);

        db=db.replace('[username]',dbUser);
        db=db.replace('[password]',dbPassword);
    }


    mongoose.connect(db,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => { logger.info(`connected to mongodb. Database name : ${dbUser}`) });
}