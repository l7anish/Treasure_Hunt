const Contest=require('../model/contest');
const logger=require('winston');


exports.getActiveContests=async (req,resp)=>{

    //find all active contests
    let contests=await Contest.find({active:true});

    contests=contests ? contests: [];
    resp.status(200).json(contests);
}

