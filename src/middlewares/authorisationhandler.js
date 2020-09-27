const jwt=require('jsonwebtoken');
const authSetup=require('../startup/auth_setup');

let PUBLIC_KEY;

const setupPublicKey=async ()=>{

    PUBLIC_KEY=await authSetup.readPublicKey();
}

setupPublicKey();

function authorise(req,resp,next) {

    const token=req.header('x-auth-token');
    if(!token) return resp.status(401).send("Access denied. No token provided");

    try{
        let payload=jwt.verify(token,PUBLIC_KEY);

        console.log(payload);
        //verify wether given token is accessToken or refreshToken
        req.user=payload;
        next();
    }catch(exception){
        console.log(exception.message);
        return resp.status('401').send("Access denied!")
    }
    
    
    
}


module.exports=authorise;

