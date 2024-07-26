import { TestCase } from './testCase';

export class WasRun extends TestCase {
    log: string;

    setUp() {
        this.log = 'setUp ';
    }

    testMethod() {
        this.log += 'testMethod ';
    }

    tearDown() {
        this.log += 'tearDown ';
    }

    testBrokenMethod() {
        throw new Error('Test failed');
    }
}
