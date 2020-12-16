const mongoose=require('mongoose');


const feedbackSchema=mongoose.Schema({
    feedback:{type:String,default:"",required:true},
    rating:{type:Number,default:0 ,required:true},
});

const Feedback=mongoose.model('feedback',feedbackSchema);

module.exports=Feedback;
