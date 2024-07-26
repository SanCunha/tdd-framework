import request from 'supertest';
import { app } from '../../server';

export const createTestSuite = async (data: { name: string }) => {
    const response = await request(app)
        .post('/api/test-suites')
        .send(data);
    return response.body;
};

export const createTestCase = async (suiteId: string, data: { name: string; testCase: string }) => {
    const response = await request(app)
        .post(`/api/test-suites/${suiteId}/test-cases`)
        .send(data);
    return response.body;
};

export const runTestSuite = async (suiteId: string) => {
    const response = await request(app)
        .post(`/api/test-suites/${suiteId}/run`);
    return response.body;
};

export const getTestSuiteResults = async (suiteId: string) => {
    const response = await request(app)
        .get(`/api/test-suites/${suiteId}/results`);
    return response.body;
};