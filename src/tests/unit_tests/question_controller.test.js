const question_controller=require('../../controller/question_controller');
const Contest=require('../../model/contest');
const LeaderBoard = require('../../model/leaderboard');
const Question=require('../../model/question');

describe("getCurrentQuestion",()=>{

    it("Should throw error if contestId is not an ObjectId",async()=>{
        let resp={};
        let req={query:{},user:{}};
        req.query.contestId=1

        try{
            await question_controller.getCurrentQuestion(req,resp);
        }catch(ex){
            expect(ex.message).toContain('contestId');
        }
    });

    it("Should throw error if contest with given contestId doesn't exist",async()=>{
        let resp={};
        let req={query:{},user:{}};
        req.query.contestId="5f684e30cb92acde514be75e";

        Contest.findById= jest.fn().mockResolvedValue(null);

        try{
            await question_controller.getCurrentQuestion(req,resp);
        }catch(ex){
            expect(ex.message).toContain('Contest');
        }
    });
    



});

describe("onSubmitAnswer",()=>{


    it("Should throw error if contestId is missing",async ()=>{

        let req={body:{}};
        let resp={};
        req.body.answer="summyAnswer";

        try{
            await question_controller.submitQuestionAnswer(req,resp);
        }catch(ex){
            expect(ex.message).toContain('contest');
        }

    });

    it("Should throw error if contestId is not valid objectId",async ()=>{

        let req={body:{}};
        let resp={};
        req.body.contestId="invalid ContestId";
        req.body.answer="summyAnswer";

        try{
            await question_controller.submitQuestionAnswer(req,resp);
        }catch(ex){
            expect(ex.message).toContain('contest');
        }

    });

    it("Should throw error if answer is missing",async ()=>{

        let req={body:{}};
        let resp={};
        req.body.contestId="5f684e30cb92acde514be75e";

        try{
            await question_controller.submitQuestionAnswer(req,resp);
        }catch(ex){
            expect(ex.message).toContain('answer');
        }

    });

    it("Should throw error if contest with given conetstId doesn't exist",async ()=>{

        let req={body:{},user:{}};
        let resp={};
        req.body.contestId="5f684e30cb92acde514be75e";
        req.body.answer="answer";
        req.user.id="5f684e30cb92acde514be75e";

        Contest.findById=jest.fn().mockResolvedValue(null);

        try{
            await question_controller.submitQuestionAnswer(req,resp);
        }catch(ex){
            expect(ex.message).toContain("Contest doesn't exist");
        }

    });

    it("Should throw error if given user does not have entry in the leaderboard",async ()=>{

        let req={body:{},user:{}};
        let resp={};
        req.body.contestId="5f684e30cb92acde514be75e";
        req.body.answer="answer";
        req.user.id="5f684e30cb92acde514be75e";

        Contest.findById=jest.fn().mockResolvedValue(true);// dummy value for mocking

        LeaderBoard.findOne=jest.fn().mockResolvedValue(null);

        try{
            await question_controller.submitQuestionAnswer(req,resp);
        }catch(ex){
            expect(ex.message).toContain("User haven't registred");
        }

    });

    it("Should throw error if question does not exist in the db for an contest",async ()=>{

        let req={body:{},user:{}};
        let resp={};
        req.body.contestId="5f684e30cb92acde514be75e";
        req.body.answer="answer";
        req.user.id="5f684e30cb92acde514be75e";

        Contest.findById=jest.fn().mockResolvedValue(true);// dummy value for mocking

        LeaderBoard.findOne=jest.fn().mockResolvedValue({level:1});

        Question.findOne=jest.fn().mockResolvedValue(null);

        try{
            await question_controller.submitQuestionAnswer(req,resp);
        }catch(ex){
            expect(ex.message).toContain("Bad request");
        }

    });






});