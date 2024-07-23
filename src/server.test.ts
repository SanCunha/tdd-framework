import request from 'supertest';
import { app, server } from './server';

beforeAll((done) => {
    done();
});

afterAll((done) => {
    server.close(done);
});

describe('TDD Framework API', () => {
    it('should create a new test suite', async () => {
        const response = await request(app)
            .post('/test-suites')
            .send({ name: 'Sample Suite' });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Sample Suite');
    });

    it('should add a test case to a test suite', async () => {
        const suiteResponse = await request(app)
            .post('/test-suites')
            .send({ name: 'Sample Suite' });

        const suiteId = suiteResponse.body.id;

        const testCaseResponse = await request(app)
            .post(`/test-suites/${suiteId}/test-cases`)
            .send({ name: 'Sample Test', testCase: 'return 1 + 1 === 2' });

        expect(testCaseResponse.status).toBe(201);
        expect(testCaseResponse.body.name).toBe('Sample Test');
    });

    it('should run a test suite', async () => {
        const suiteResponse = await request(app)
            .post('/test-suites')
            .send({ name: 'Sample Suite' });

        const suiteId = suiteResponse.body.id;

        await request(app)
            .post(`/test-suites/${suiteId}/test-cases`)
            .send({ name: 'Sample Test', testCase: 'return 1 + 1 === 2' });

        const runResponse = await request(app)
            .post(`/test-suites/${suiteId}/run`);

        expect(runResponse.status).toBe(200);
        expect(runResponse.body.results[0].status).toBe('passed');
    });

    it('should get test suite results', async () => {
        const suiteResponse = await request(app)
            .post('/test-suites')
            .send({ name: 'Sample Suite' });

        const suiteId = suiteResponse.body.id;

        await request(app)
            .post(`/test-suites/${suiteId}/test-cases`)
            .send({ name: 'Sample Test', testCase: 'return 1 + 1 === 2' });

        await request(app)
            .post(`/test-suites/${suiteId}/run`);

        const resultsResponse = await request(app)
            .get(`/test-suites/${suiteId}/results`);

        expect(resultsResponse.status).toBe(200);
        expect(resultsResponse.body.results[0].status).toBe('passed');
    });
});
