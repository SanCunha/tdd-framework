import { TestCaseType } from "../types/testCase";
import { TestResult } from "./testResult";

export class TestCase {
    name: string;
    testCase: TestCaseType;

    constructor(name: string, testCase: TestCaseType) {
        this.name = name;
        this.testCase = testCase;
    }

    setUp(): void {
        // Setup logic if any
    }

    tearDown(): void {
        // Teardown logic if any
    }

    run(result: TestResult): void {
        result.testStarted();
        this.setUp();
        try {
            if(!this.testCase()) result.testFailed();
        } catch (error) {
            result.testFailed();
        }
        this.tearDown();
    }
}
