const jwt=require('jsonwebtoken');
const { Logform } = require('winston');
const authSetup=require('../startup/auth_setup');

let PUBLIC_KEY;

const setupPublicKey=async ()=>{

    PUBLIC_KEY=await authSetup.readPublicKey();
}



async function authorise(req,resp,next) {

    if(!PUBLIC_KEY) await setupPublicKey();

    const token=req.header('x-auth-token');
    if(!token) return resp.status(401).json({error:'Access denied. No token provided'});

    try{
        let payload=jwt.verify(token,PUBLIC_KEY,{ algorithms: ['RS256'] });

        if(payload.tokenType ==='refreshToken') return resp.status(401).json({error:'Invalid token type'})

        req.user=payload;
        next();
    }catch(exception){
        console.log(exception);
        return resp.status('401').send("Access denied!")
    }
    
    
    
}


module.exports=authorise;

