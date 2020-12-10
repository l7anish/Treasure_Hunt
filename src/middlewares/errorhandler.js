const logger=require('winston');

const errorHandler=(error,req,resp,next)=>{
    if(error.httpStatus){
        logger.info(`Handled error: ${error.message} with status ${error.httpStatus} from userId :${req.user}`);
        resp.status(error.httpStatus).send(error.message);
    }else{
        logger.info(`Handled error ${error} from userId: ${req.user}`);
        resp.status(500).send("something went wrong....");
    }

    
}

module.exports=errorHandler;