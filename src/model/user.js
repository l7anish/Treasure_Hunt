const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const authSetup=require('../startup/auth_setup');

let PRIVATE_KEY;

const setupPrivateKey=async ()=>{
    PRIVATE_KEY=await authSetup.readPrivateKey();
}

setupPrivateKey();

const userSchema=mongoose.Schema({
    name:{ type:String, required:true},
    email:{type:String,required:true},
    enabled:{type:String,required:true},
    role:{type:String,required:true}
});

userSchema.methods.generateAuthToken= function (tokenType) {
    let token= jwt.sign({ id:this._id,tokenType},PRIVATE_KEY,
    {
        algorithm: 'RS256',
        expiresIn: '2h'
    })
    return token;
}

const User=mongoose.model('user',userSchema);

module.exports=User;