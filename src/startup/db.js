const mongoose = require('mongoose');
const config=require('config');


exports.initializeDB=()=>{

    if(process.env.NODE_ENV==='test'){
        return; //Do not initialise db in test environment
    }

    let db=config.get('db');

    if(process.env.NODE_ENV === 'production'){
        const dbUser=config.get('dbUser');
        const dbPassword=config.get('dbPassword');

        db=db.replace('[username]',dbUser);
        db=db.replace('[password]',dbPassword);
    }


    mongoose.connect(db,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => { console.info(`connected to mongodb..., ${db}`) });
}