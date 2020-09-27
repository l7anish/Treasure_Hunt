const mongoose = require('mongoose');
const config=require('config');


exports.initializeDB=()=>{

    if(process.env.NODE_ENV==='test'){
        return; //Do not initialise db in test environment
    }

    const db=config.get('db');

    mongoose.connect(db,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => { console.info(`connected to mongodb..., ${db}`) });
}