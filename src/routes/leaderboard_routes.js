const express=require('express');
const assyncHandler=require('../middlewares/asynchandler');
const controller=require('../controller/leaderboard_controller');


const router=express.Router();

router.get('/',assyncHandler(controller.getLeaderBoardOfContest));



module.exports=router;