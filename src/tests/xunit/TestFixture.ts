import { TestCase } from './TestCase';

export class TestFixture {
    constructor(public name: string, public testCases: TestCase[]) {}

    addTestCase(testCase: TestCase) {
        this.testCases.push(testCase);
    }
}
