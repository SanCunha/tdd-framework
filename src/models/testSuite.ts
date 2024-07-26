import { TestCase } from './testCase';
import { TestResult } from './testResult';

export class TestSuite {
    name: string;
    tests: TestCase[];

    constructor(name: string) {
        this.name = name;
        this.tests = [];
    }

    add(test: TestCase) {
        this.tests.push(test);
    }

    run(result: TestResult) {
        this.tests.forEach(test => test.run(result));
    }
}
