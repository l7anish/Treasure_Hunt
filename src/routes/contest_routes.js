const express=require('express');
const contestController=require('../controller/contest_controller');


const router=express.Router();

//contest apis
router.get('/',contestController.getActiveContests);





module.exports=router;