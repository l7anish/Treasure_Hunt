const leaderboardController=require('../../controller/leaderboard_controller');

describe('getLeaderBoardOfContest',()=>{


    it('should throw error if contestId is not an objectId',async ()=>{
        let req={query:{}};
        let resp={};
        req.query.contestId="abc";
        req.query.page="abc";
        req.query.limit="abc";

        try{
            await leaderboardController.getLeaderBoardOfContest(req,resp)
        }catch(ex){
            expect(ex.message).toContain('contestId');
        }
    });

    it('should throw error if page is than 1',async ()=>{
        let req={query:{}};
        let resp={};
        req.query.contestId="5f684e30cb92acde514be75e"; //dummy contestId
        req.query.page=-1;
        try{
            await leaderboardController.getLeaderBoardOfContest(req,resp)
        }catch(ex){
            expect(ex.message).toContain('page');
        }
    });

    it('should throw error if limit is than 3',async ()=>{
        let req={query:{}};
        let resp={};
        req.query.contestId="5f684e30cb92acde514be75e"; //dummy contestId
        req.query.page=2; //dummy page value
        req.query.limit=2; // limit less than 3
        try{
            await leaderboardController.getLeaderBoardOfContest(req,resp)
        }catch(ex){
            expect(ex.message).toContain('limit');
        }
    });



});