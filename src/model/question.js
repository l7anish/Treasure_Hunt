const mongoose=require('mongoose');


const clueSchema=mongoose.Schema({
    number:{type:Number,min:1,required:true},
    clueBody:{type:String,required:true},
    image:{type:String,required:true}
});

const questionSchema=mongoose.Schema({
    contestId:{type:mongoose.Schema.Types.ObjectId,required:true},
    questionBody:{type:String,default:""},
    image:{type:String},
    level:{type:Number,min:1,required:true},
    answer:{type:String,required:true},
    enabled:{type:Boolean,default:false},
    currentClue:{type:Number,default:0},
    clues:[clueSchema]

});

const Question=mongoose.model('question',questionSchema);
questionSchema.index({contestId:1,level:1},{unique:true});

module.exports=Question;