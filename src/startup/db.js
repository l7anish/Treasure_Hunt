const mongoose = require('mongoose');
const config=require('config');


exports.initializeDB=()=>{

    const db=config.get('db');

    mongoose.connect(db,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => { console.info(`connected to mongodb..., ${db}`) });
}