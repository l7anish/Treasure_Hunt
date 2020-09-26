const LeaderBoard=require('../model/leaderboard');
const Joi=require('joi');
Joi.objectId = require('joi-objectid')(Joi)

exports.getLeaderBoardOfContest=async(req,resp)=>{
    let requestBody={};
    let leaderBoardResponse=[];

    const requestSchema=Joi.object({
        contestId:Joi.objectId().required(),
        page:Joi.number().required().default(1).min(1),
        limit:Joi.number().required().default(3).min(3),
    });

    requestBody.contestId=req.query.contestId;
    requestBody.page=req.query.page;
    requestBody.limit=req.query.limit;

    try{
        requestBody=await requestSchema.validateAsync(requestBody);
    }catch(ex){
        throw({httpStatus:400,message:ex.details[0].message});
    }
    

    let leaderBoard=await LeaderBoard.find({contestId:requestBody.contestId})
        .sort({level:-1,lastUpdated:1}).limit(requestBody.limit).skip((requestBody.page-1) * requestBody.limit).exec();


    leaderBoardResponse=leaderBoard.map(contestant=>{
        newContestant={name:contestant.userName,level:contestant.level,completedIn:contestant.lastUpdated};
        return newContestant;
    });

    let count=await LeaderBoard.countDocuments({contestId:requestBody.contestId});

    let totalPages= Math.ceil((count/requestBody.limit));
    console.log(totalPages);

    resp.status(200).json({totalPages,leaderBoard:leaderBoardResponse});
}