export interface TestResult {
    testCaseName: string;
    status: 'passed' | 'failed';
    error?: string;
}
