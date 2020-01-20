const request = require('supertest');
const app = require('../app');

describe('candidates', () => {
    describe('POST', () => {

        it('accepts a valid candidate', (done) => {
            request(app)
                .post('/candidates/')
                .send({
                    "id": "ae588a6b-4540-5714-bfe2-a5c2a65f547a",
                    "name": "Jimmy Coder",
                    "skills": ["javascript", "es6", "lame", "express"]
                })
                .expect(200)
                .end((error) => (error) ? done.fail(error) : done());
        });

        it('returns bad request when the body is empty', (done) => {
            request(app)
                .post('/candidates/')
                .expect(400)
                .end((error) => (error) ? done.fail(error) : done());
        })

        it('returns bad request when the candidate is incomplete', (done) => {
            request(app)
                .post('/candidates/')
                .send({
                    "id": "ae588a6b-4540-5714-bfe2-a5c2a65f547a",
                    "skills": ["javascript", "es6", "lame", "express"]
                })
                .expect(400)
                .end((error) => (error) ? done.fail(error) : done());
        })
    });

    describe('search', () => {
        it('returns bad request when the skills are empty', (done) => {
            request(app)
                .get('/candidates/search?skills=')
                .expect(400)
                .end((error) => (error) ? done.fail(error) : done());
        })

        it('returns bad request when there is no skills query param', (done) => {
            request(app)
                .get('/candidates/search')
                .expect(400)
                .end((error) => (error) ? done.fail(error) : done());
        })

        it('returns 404 when there is no suitable candidate', (done) => {
            request(app)
                .get('/candidates/search?skills=impossibleSkill')
                .expect(404)
                .end((error, res) => {
                    console.log(res.text);
                    (error) ? done.fail(error) : done()
                });
        })

        it('returns the best candidate depending on skill', (done) => {
            request(app)
                .post('/candidates/')
                .send({
                    "id": "a",
                    "name": "Jimmy Coder",
                    "skills": ["javascript", "es6", "node", "express"]
                })

            request(app)
                .post('/candidates/')
                .send({
                    "id": "b",
                    "name": "Johnny Coder",
                    "skills": ["javascript", "es6", "express"]
                })

            request(app)
                .get('/candidates/search?skills=node,javascript')
                .expect(200)
                .end((error, res) => {
                    expect(res.text).toEqual('{"id":"ae588a6b-4540-5714-bfe2-a5c2a65f547a","name":"Jimmy Coder","skills":["javascript","es6","lame","express"]}');
                    (error) ? done.fail(error) : done();
                });
        })
    })

});
