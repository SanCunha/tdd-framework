import { server } from '../server';
import { createTestSuite, createTestCase, runTestSuite, getTestSuiteResults } from './helpers/testHelpers';

beforeAll((done) => {
    done();
});

afterAll((done) => {
    server.close(done);
});

describe('TDD Framework API', () => {
    it('should create a new test suite', async () => {
        const testSuite = await createTestSuite({ name: 'Sample Suite' });
        expect(testSuite.name).toBe('Sample Suite');
    });

    it('should add a test case to a test suite', async () => {
        const testSuite = await createTestSuite({ name: 'Sample Suite' });
        const testCase = await createTestCase(testSuite.id, { name: 'Sample Test', testCase: 'return 1 + 1 === 2' });

        expect(testCase.name).toBe('Sample Test');
    });

    it('should run a test suite', async () => {
        const testSuite = await createTestSuite({ name: 'Sample Suite' });
        await createTestCase(testSuite.id, { name: 'Sample Test', testCase: 'return 1 + 1 === 2' });
        
        const runResults = await runTestSuite(testSuite.id);
        expect(runResults).toBe('1 run, 0 failed');
    });

    it('should get test suite results', async () => {
        const testSuite = await createTestSuite({ name: 'Sample Suite' });
        await createTestCase(testSuite.id, { name: 'Sample Test', testCase: 'return 1 + 1 === 2' });

        await runTestSuite(testSuite.id);
        
        const results = await getTestSuiteResults(testSuite.id);

        expect(results).toBe('1 run, 0 failed');
    });
});
