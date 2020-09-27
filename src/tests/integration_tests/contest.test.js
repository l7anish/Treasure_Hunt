const dbHandler=require('../test_db_handler');
const request=require('supertest');
const CONTEST=require('../../model/contest');


let server;

describe('/api/contests',()=>{

    beforeAll(async ()=> await dbHandler.connect());

    afterAll(async () => await dbHandler.closeDatabase());

    beforeEach(()=>{server=require('../../index');});

    afterEach(()=>{
        server.close();
        async () => await dbHandler.clearDatabase();
    });
    
    describe('GET /',()=>{


        it('should return a list of active contest which contains 2 elements',async ()=>{

            // contains 2 active and 1 inActive contests
            await CONTEST.insertMany([
                {
                    "contestName" : "Alohamora",
                    "active" : true,
                    "started" : false,
                    "startDate" : new Date()
                },
                {
                    "contestName" : "Enigma",
                    "active" : true,
                    "started" : false,
                    "startDate" : new Date()
                },
                {
                    "contestName" : "Treasure hunt",
                    "active" : false,
                    "started" : false,
                    "startDate" : new Date()
                }
            ])

            const resp=await request(server).get('/api/contests');

            expect(resp.status).toBe(200);
            expect(resp.body.length).toBe(2);
            expect(resp.body.some(contest=> contest.contestName === 'Alohamora'));
            expect(resp.body.some(contest=> contest.contestName === 'Enigma'));


        });

    });


})