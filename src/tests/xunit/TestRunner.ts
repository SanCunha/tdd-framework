import { TestFixture } from './TestFixture';
import { TestResult } from './TestResult';

export class TestRunner {
    run(testFixture: TestFixture): TestResult[] {
        return testFixture.testCases.map(testCase => {
            try {
                testCase.execute();
                return { testCaseName: testCase.name, status: 'passed' };
            //TODO: type error
            } catch (error:any) {
                return { testCaseName: testCase.name, status: 'failed', error: error.message };
            }
        });
    }
}
