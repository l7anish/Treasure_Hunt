const dbHandler = require('../test_db_handler');
const request = require('supertest');

const User = require('../../model/user');
const Contest = require('../../model/contest');
const Leadeboard = require('../../model/leaderboard');
const Question = require('../../model/question');


let server;

describe('/api/questions', () => {

    beforeAll(async () => await dbHandler.connect());

    afterAll(async () => await dbHandler.closeDatabase());

    beforeEach(() => { server = require('../../index'); });

    afterEach(async () => {
        server.close();
        await dbHandler.clearDatabase();
    });

    describe('GET /currentquestion', () => {


        it('Should return access denied (status 401) if api is fired with no accessToken', async () => {

            let contestId = "5f684e30cb92acde514be75e";

            const resp = await request(server).get('/api/questions/currentquestion')
                .query({ contestId });

            expect(resp.status).toBe(401);
            expect(resp.body.error).toContain('No token');
        });

        it('Should return Invalid token type (status 401) if api is fired with refreshToken', async () => {
            let contestId = "5f684e30cb92acde514be75e";

            let user = new User({
                "_id": "5f684d8db2ee3b2e58cc3501",
                "email": "dummy@mail.com",
                "name": "dummy",
                "enabled": "true",
                "role": "user",
            });
            let refreshToken = user.generateAuthToken('refreshToken');

            const resp = await request(server).get('/api/questions/currentquestion')
                .query({ contestId }).set('x-auth-token', refreshToken);

            expect(resp.status).toBe(401);
            expect(resp.body.error).toContain('Invalid token type');
        });

        it('Should return curent question(status 200) if api is fired with valid arguments for existing contestant', async () => {

            let contestId = "5f684e30cb92acde514be75e";



            let user = new User({
                _id: "6f684d8db2ee3b2e58cc3501",
                email: "dummy@mail.com",
                name: "dummy",
                "enabled": "true",
                "role": "user",
            });

            await user.save();

            let contest = new Contest({
                _id: contestId,
                "contestName": "Alohamora",
                "active": true,
                "started": false,
                "startDate": new Date()
            });
            await contest.save();

            let leaderboard = new Leadeboard({
                "contestId": contestId,
                "userId": "6f684d8db2ee3b2e58cc3501",
                "userName": "dummy",
                "level": 1,
                "lastUpdated": new Date()
            });

            await leaderboard.save();

            let question = new Question({
                "contestId": contestId,
                "questionBody": "What is your name?",
                "image": "https://cdn.eso.org/images/thumb300y/eso1907a.jpg",
                "level": 1.0,
                "answer": "dummy",
                "enabled": true,
                "currentClue": 2,
                "clues": [
                    {
                        "number": 1.0,
                        "clueBody": "Clue 1",
                        "image": "https://cdn.eso.org/images/thumb300y/eso1907a.jpg"
                    },
                    {
                        "number": 2.0,
                        "clueBody": "Clue 1",
                        "image": "https://cdn.eso.org/images/thumb300y/eso1907a.jpg"
                    }
                ]
            });

            await question.save();

            let accessToken = user.generateAuthToken('accessToken');

            const resp = await request(server).get('/api/questions/currentquestion')
                .query({ contestId }).set('x-auth-token', accessToken);

            expect(resp.status).toBe(200);
            expect(resp.body.level).toEqual(question.level);
            expect(resp.body.question).toEqual(question.questionBody);
        });

        it('Should return curent question(status 200) if api is fired with valid arguments for first time contestant', async () => {

            let contestId = "5f684e30cb92acde514be75e";

            let user = new User({
                _id: "5f684d8db2ee3b2e58cc3501",
                email: "dummy@mail.com",
                name: "dummy",
                "enabled": "true",
                "role": "user",
            });

            await user.save();

            let contest = new Contest({
                _id: contestId,
                "contestName": "Alohamora",
                "active": true,
                "started": false,
                "startDate": new Date()
            });
            await contest.save();

            let leaderboard = new Leadeboard({
                "contestId": contestId,
                "userId": "5f684d8db2ee3b2e58cc3501",
                "userName": "dummy",
                "level": 1,
                "lastUpdated": new Date()
            });

            let question = new Question({
                "contestId": contestId,
                "questionBody": "What is your name?",
                "image": "https://cdn.eso.org/images/thumb300y/eso1907a.jpg",
                "level": 1.0,
                "answer": "dummy",
                "enabled": true,
                "currentClue": 2,
                "clues": [
                    {
                        "number": 1.0,
                        "clueBody": "Clue 1",
                        "image": "https://cdn.eso.org/images/thumb300y/eso1907a.jpg"
                    },
                    {
                        "number": 2.0,
                        "clueBody": "Clue 1",
                        "image": "https://cdn.eso.org/images/thumb300y/eso1907a.jpg"
                    }
                ]
            });

            await question.save();

            let accessToken = user.generateAuthToken('accessToken');

            const resp = await request(server).get('/api/questions/currentquestion')
                .query({ contestId }).set('x-auth-token', accessToken);

            expect(resp.status).toBe(200);
            expect(resp.body.level).toEqual(question.level);
            expect(resp.body.question).toEqual(question.questionBody);
        });

        it('Should return last_question flag to true (with status 200) if no more question is pending', async () => {

            let contestId = "5f684e30cb92acde514be75e";

            let user = new User({
                _id: "6f684d8db2ee3b2e58cc3501",
                email: "dummy@mail.com",
                name: "dummy",
                "enabled": "true",
                "role": "user",
            });

            await user.save();

            let contest = new Contest({
                _id: contestId,
                "contestName": "Alohamora",
                "active": true,
                "started": false,
                "startDate": new Date()
            });
            await contest.save();

            let leaderboard = new Leadeboard({
                "contestId": contestId,
                "userId": "6f684d8db2ee3b2e58cc3501",
                "userName": "dummy",
                "level": 2,
                "lastUpdated": new Date()
            });

            await leaderboard.save();

            let question = new Question({
                "contestId": contestId,
                "questionBody": "What is your name?",
                "image": "https://cdn.eso.org/images/thumb300y/eso1907a.jpg",
                "level": 1.0,
                "answer": "dummy",
                "enabled": true,
                "currentClue": 2,
                "clues": [
                    {
                        "number": 1.0,
                        "clueBody": "Clue 1",
                        "image": "https://cdn.eso.org/images/thumb300y/eso1907a.jpg"
                    },
                    {
                        "number": 2.0,
                        "clueBody": "Clue 1",
                        "image": "https://cdn.eso.org/images/thumb300y/eso1907a.jpg"
                    }
                ]
            });

            await question.save();

            let accessToken = user.generateAuthToken('accessToken');

            const resp = await request(server).get('/api/questions/currentquestion')
                .query({ contestId }).set('x-auth-token', accessToken);

            expect(resp.status).toBe(200);
            expect(resp.body.lastQuestion).toBe(true);
        });


    });

    describe('GET /answer', () => {

        it('Should return access denied if api is fired without accessToken', async () => {

            let contestId = '5f684e30cb92acde514be75e';
            let answer = 'dummyAnswer';

            const resp = await request(server).post('/api/questions/answer')
                .send({
                    contestId,
                    answer
                });

            expect(resp.status).toBe(401);
            expect(resp.body.error).toContain('No token');
        });

        it('Should return true if given answer is correct', async () => {

            let contestId = '5f684e30cb92acde514be75e';
            let answer = 'dummy';

            let user = new User({
                _id: "5f684d8db2ee3b2e58cc3501",
                email: "dummy@mail.com",
                name: "dummy",
                "enabled": "true",
                "role": "user",
            });


            let contest = new Contest({
                _id: contestId,
                "contestName": "Alohamora",
                "active": true,
                "started": false,
                "startDate": new Date()
            });
            await contest.save();

            let leaderboard = new Leadeboard({
                "contestId": contestId,
                "userId": "5f684d8db2ee3b2e58cc3501",
                "userName": "dummy",
                "level": 1,
                "lastUpdated": new Date()
            });
            await leaderboard.save();

            let question = new Question({
                "contestId": contestId,
                "questionBody": "What is your name?",
                "image": "https://cdn.eso.org/images/thumb300y/eso1907a.jpg",
                "level": 1.0,
                "answer": "dummy",
                "enabled": true,
                "currentClue": 2,
                "clues": [
                    {
                        "number": 1.0,
                        "clueBody": "Clue 1",
                        "image": "https://cdn.eso.org/images/thumb300y/eso1907a.jpg"
                    },
                    {
                        "number": 2.0,
                        "clueBody": "Clue 1",
                        "image": "https://cdn.eso.org/images/thumb300y/eso1907a.jpg"
                    }
                ]
            });
            await question.save();

            let accessToken = user.generateAuthToken('accessToken');

            let expectedUserLevel=(leaderboard.level)+1;

            const resp = await request(server).post('/api/questions/answer')
                .set('x-auth-token',accessToken)
                .send({
                    contestId,
                    answer
                });

            leaderboard=await Leadeboard.findById(leaderboard._id);

            expect(resp.status).toBe(200);
            expect(resp.body).toBe(true);
            expect(leaderboard.level).toBe(expectedUserLevel);
        });
    
        it('Should return false if given answer is wrong', async () => {

            let contestId = '5f684e30cb92acde514be75e';
            let answer = 'wrongdummy';

            let user = new User({
                _id: "5f684d8db2ee3b2e58cc3501",
                email: "dummy@mail.com",
                name: "dummy",
                "enabled": "true",
                "role": "user",
            });


            let contest = new Contest({
                _id: contestId,
                "contestName": "Alohamora",
                "active": true,
                "started": false,
                "startDate": new Date()
            });
            await contest.save();

            let leaderboard = new Leadeboard({
                "contestId": contestId,
                "userId": "5f684d8db2ee3b2e58cc3501",
                "userName": "dummy",
                "level": 1,
                "lastUpdated": new Date()
            });
            await leaderboard.save();

            let question = new Question({
                "contestId": contestId,
                "questionBody": "What is your name?",
                "image": "https://cdn.eso.org/images/thumb300y/eso1907a.jpg",
                "level": 1.0,
                "answer": "dummy",
                "enabled": true,
                "currentClue": 2,
                "clues": [
                    {
                        "number": 1.0,
                        "clueBody": "Clue 1",
                        "image": "https://cdn.eso.org/images/thumb300y/eso1907a.jpg"
                    },
                    {
                        "number": 2.0,
                        "clueBody": "Clue 1",
                        "image": "https://cdn.eso.org/images/thumb300y/eso1907a.jpg"
                    }
                ]
            });
            await question.save();

            let accessToken = user.generateAuthToken('accessToken');

            let expectedUserLevel=leaderboard.level;

            const resp = await request(server).post('/api/questions/answer')
                .set('x-auth-token',accessToken)
                .send({
                    contestId,
                    answer
                });

            leaderboard=await Leadeboard.findById(leaderboard._id);

            expect(resp.status).toBe(200);
            expect(resp.body).toBe(false);
            expect(leaderboard.level).toBe(expectedUserLevel);
        });
    
    });
});