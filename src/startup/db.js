const mongoose = require('mongoose');
const config=require('config');


exports.initializeDB=()=>{

    if(process.env.NODE_ENV==='test'){
        return; //Do not initialise db in test environment
    }

    let db=config.get('db');

    if(process.env.NODE_ENV === 'production'){
        const dbUser=config.get('dbUser');
        console.log(dbUser);
        const dbPassword=config.get('dbPassword');
    }


    mongoose.connect(db,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => { console.info(`connected to mongodb..., ${db}`) });
}