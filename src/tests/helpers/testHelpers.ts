import request from 'supertest';
import { app } from '../../server';

interface TestSuiteFactoryOptions {
    name?: string;
}

interface TestCaseFactoryOptions {
    name?: string;
    testCase?: string;
}

export async function createTestSuite(options: TestSuiteFactoryOptions = {}) {
    const response = await request(app)
        .post('/test-suites')
        .send({ name: options.name || 'Default Suite Name' });

    return response.body;
}

export async function createTestCase(suiteId: string, options: TestCaseFactoryOptions = {}) {
    const response = await request(app)
        .post(`/test-suites/${suiteId}/test-cases`)
        .send({ name: options.name || 'Default Test Case Name', testCase: options.testCase || 'return 1 + 1 === 2' });

    return response.body;
}

export async function runTestSuite(suiteId: string) {
    const response = await request(app)
        .post(`/test-suites/${suiteId}/run`);

    return response.body;
}

export async function getTestSuiteResults(suiteId: string) {
    const response = await request(app)
        .get(`/test-suites/${suiteId}/results`);

    return response.body;
}
