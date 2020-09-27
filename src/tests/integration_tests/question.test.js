const dbHandler=require('../test_db_handler');
const request=require('supertest');


let server;

describe('/api/questions',()=>{

    beforeAll(async ()=> await dbHandler.connect());

    afterAll(async () => await dbHandler.closeDatabase());

    beforeEach(()=>{server=require('../../index');});

    afterEach(()=>{
        server.close();
        async () => await dbHandler.clearDatabase();
    });
    
    describe('GET /currentquestion',()=>{


        it('should return a list of active contest which contains 2 elements',async ()=>{

            


        });

    });


})