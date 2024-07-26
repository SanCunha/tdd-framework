import { TestCase } from './testCase';
import { WasRun } from './wasRun';
import { TestResult } from './testResult';
import { TestSuite } from './testSuite';

export class TestCaseTest extends TestCase {
    result: TestResult;

    setUp() {
        this.result = new TestResult();
    }

    testTemplateMethod() {
        const test = new WasRun('testMethod');
        test.run(this.result);
        console.assert(test.log === 'setUp testMethod tearDown ', `Expected: 'setUp testMethod tearDown ', but got: ${test.log}`);
    }

    testResult() {
        const test = new WasRun('testMethod');
        test.run(this.result);
        console.assert(this.result.summary() === '1 run, 0 failed', `Expected: '1 run, 0 failed', but got: ${this.result.summary()}`);
    }

    testFailedResult() {
        const test = new WasRun('testBrokenMethod');
        test.run(this.result);
        console.assert(this.result.summary() === '1 run, 1 failed', `Expected: '1 run, 1 failed', but got: ${this.result.summary()}`);
    }

    testFailedResultFormatting() {
        this.result.testStarted();
        this.result.testFailed();
        console.assert(this.result.summary() === '1 run, 1 failed', `Expected: '1 run, 1 failed', but got: ${this.result.summary()}`);
    }

    testSuite() {
        const suite = new TestSuite();
        suite.add(new WasRun('testMethod'));
        suite.add(new WasRun('testBrokenMethod'));
        suite.run(this.result);
        console.assert(this.result.summary() === '2 run, 1 failed', `Expected: '2 run, 1 failed', but got: ${this.result.summary()}`);
    }
}
