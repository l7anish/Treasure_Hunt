const express=require('express');
const asyncHandler=require('../middlewares/asynchandler');
const googleSignIn=require('../controller/public/google_signin');
const errorHandler=require('../middlewares/errorhandler');
const contestRoutes=require('../routes/contest_routes');
const leaderBoardRoutes=require('../routes/leaderboard_routes');
const questionRoute=require('../routes/question_routes');



exports.initializeRoutes=(app)=>{
    app.use(express.json());

    //general apis
    app.post('/google/login',asyncHandler(googleSignIn.login));


    app.use('/api/contests',contestRoutes);
    app.use('/api/leaderboard',leaderBoardRoutes);
    app.use('/api/questions',questionRoute)



    app.use(errorHandler);
}