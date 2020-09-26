const mongoose=require('mongoose');


const contestSchema=mongoose.Schema({
    contestName:{type:String,required:true},
    active:{type:Boolean,default:true ,required:true},
    started:{type:Boolean,default:false,required:true},
    startDate:{type:Date,required:true}
});


const Contest=mongoose.model('contest',contestSchema);

module.exports=Contest;