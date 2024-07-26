export type TestCase = () => void;

export interface TestSuite {
    id: string;
    name: string;
    testCases: { id: string; name: string; testCase: TestCase }[];
    results: { testCase: string; status: 'passed' | 'failed'; error?: string }[];
}

export const testSuites: TestSuite[] = [];
