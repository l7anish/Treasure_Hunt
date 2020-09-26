const mongoose=require('mongoose');


const leaderBoardSchema = mongoose.Schema({
    contestId:{type:mongoose.Schema.Types.ObjectId,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    userName:{type:String,required:true},
    level:{type:Number,required:true},
    lastUpdated:{type:Date,required:true}
});


const LeaderBoard=mongoose.model('leaderboard',leaderBoardSchema,'leaderboard');

module.exports=LeaderBoard;