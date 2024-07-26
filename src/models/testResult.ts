export class TestResult {
    runCount: number;
    errorCount: number;

    constructor() {
        this.runCount = 0;
        this.errorCount = 0;
    }

    testFailed() {
        this.errorCount++;
    }

    testStarted() {
        this.runCount++;
    }

    summary() {
        return `${this.runCount} run, ${this.errorCount} failed`;
    }
}
