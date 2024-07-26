import { TestResult } from "./testResult";

export class TestCase {
    name: string;
    testMethod: () => void;

    constructor(name: string, testMethod: () => void) {
        this.name = name;
        this.testMethod = testMethod;
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
            this.testMethod();
        } catch (error) {
            result.testFailed();
        }
        this.tearDown();
    }
}
