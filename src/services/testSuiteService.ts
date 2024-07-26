import { v4 as uuidv4 } from 'uuid';
import { TestSuite, testSuites} from '../models/testSuite';
import { TestCase } from '../types/testSuite';

export class TestSuiteService {
    addTestSuite(newSuite: TestSuite) {
        testSuites.push(newSuite);
    }

    addTestCaseToSuite(suiteId: string, name: string, testCase: TestCase) {
        const suite = testSuites.find(s => s.id === suiteId);
        if (!suite) {
            throw new Error('Test suite not found');
        }
        const newTestCase = { id: uuidv4(), name, testCase };
        suite.testCases.push(newTestCase);
        return newTestCase;
    }

    runTestSuite(suiteId: string) {
        const suite = testSuites.find(s => s.id === suiteId);
        if (!suite) {
            throw new Error('Test suite not found');
        }
        suite.results = suite.testCases.map(testCase => {
            try {
                testCase.testCase();
                return { testCase: testCase.name, status: 'passed' };
            } catch (error: any) {
                return { testCase: testCase.name, status: 'failed', error: error.message };
            }
        });
        return suite.results;
    }

    getTestSuiteResults(suiteId: string) {
        const suite = testSuites.find(s => s.id === suiteId);
        if (!suite) {
            throw new Error('Test suite not found');
        }
        return suite.results;
    }
}
