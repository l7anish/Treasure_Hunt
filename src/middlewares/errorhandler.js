const errorHandler=(error,req,resp,next)=>{
    
    
    if(error.httpStatus){
        console.log("Error Handler: "+error.message);
        resp.status(error.httpStatus).send(error.message);
    }else{
        console.log(error);
        resp.status(500).send("something went wrong....");
    }

    
}

module.exports=errorHandler;