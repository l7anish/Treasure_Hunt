const dbHandler=require('../test_db_handler');
const request=require('supertest');
const LEADERBOARD=require('../../model/leaderboard');


let server;

describe('/api/leaderboard',()=>{

    beforeAll(async ()=> await dbHandler.connect());

    afterAll(async () => await dbHandler.closeDatabase());

    beforeEach(()=>{server=require('../../index');});

    afterEach(()=>{
        server.close();
        async () => await dbHandler.clearDatabase();
    });
    
    describe('GET /',()=>{

        it('should return leaderboard for given contestId',async ()=>{

            let contestId="5f676002598dbcc7eeb02c26";
            let page=1;
            let limit=3;

            await LEADERBOARD.insertMany([
                {
                    "contestId" : "5f676002598dbcc7eeb02c26",
                    "userId" : "5f66f8bd9cfb814a0cd082ba",
                    "userName" : "sebin",
                    "level" : 1.0,
                    "lastUpdated" : new Date()
                },{
                    "contestId" : "5f676002598dbcc7eeb02c26",
                    "userId" : "5f66f8bd9cfb814a0cd082ba",
                    "userName" : "benin",
                    "level" : 2.0,
                    "lastUpdated" : new Date()
                }
            ]);

            const resp=await request(server).get('/api/leaderboard')
                .query({contestId,page,limit});
            
            expect(resp.status).toBe(200);
            expect(resp.body.leaderBoard.length).toBe(2);
            expect(resp.body.leaderBoard.some(contestant=> contestant.userName ==='sebin'));
            expect(resp.body.leaderBoard.some(contestant=> contestant.userName ==='benin'));
        });

    });


})