const helmet = require('helmet');
const compression=require('compression');

module.exports=initializeProductionSetup=(app)=> {

    app.use(helmet());
    app.use(compression());
}