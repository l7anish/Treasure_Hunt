const express=require('express');
const questionController=require('../controller/question_controller');
const asyncHandler=require('../middlewares/asynchandler');
const authorise=require('../middlewares/authorisationhandler');

const router=express.Router();


router.get('/currentquestion',authorise,asyncHandler(questionController.getCurrentQuestion));
router.post('/answer',authorise,asyncHandler(questionController.submitQuestionAnswer));

module.exports=router;