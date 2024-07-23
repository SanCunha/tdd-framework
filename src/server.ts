import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(bodyParser.json());

type TestCase = () => void;
interface TestSuite {
    id: string;
    name: string;
    testCases: { id: string; name: string; testCase: TestCase }[];
    results: { testCase: string; status: 'passed' | 'failed'; error?: string }[];
}

const testSuites: TestSuite[] = [];

// Create Test Suite
app.post('/test-suites', (req, res) => {
    const { name } = req.body;
    const newSuite: TestSuite = { id: uuidv4(), name, testCases: [], results: [] };
    testSuites.push(newSuite);
    res.status(201).json(newSuite);
});

// Add Test Case to Suite
app.post('/test-suites/:suiteId/test-cases', (req, res) => {
    const { suiteId } = req.params;
    const { name, testCase } = req.body;
    const suite = testSuites.find(s => s.id === suiteId);
    if (!suite) {
        return res.status(404).json({ message: 'Test suite not found' });
    }
    const newTestCase = { id: uuidv4(), name, testCase: new Function(testCase) as TestCase };
    suite.testCases.push(newTestCase);
    res.status(201).json(newTestCase);
});

// Run Test Suite
app.post('/test-suites/:suiteId/run', (req, res) => {
    const { suiteId } = req.params;
    const suite = testSuites.find(s => s.id === suiteId);
    if (!suite) {
        return res.status(404).json({ message: 'Test suite not found' });
    }
    suite.results = suite.testCases.map(testCase => {
        try {
            testCase.testCase();
            return { testCase: testCase.name, status: 'passed' };
        } catch (error:any) {
            return { testCase: testCase.name, status: 'failed', error: error.message };
        }
    });
    res.status(200).json({ suiteId: suite.id, results: suite.results });
});

// Get Test Suite Results
app.get('/test-suites/:suiteId/results', (req, res) => {
    const { suiteId } = req.params;
    const suite = testSuites.find(s => s.id === suiteId);
    if (!suite) {
        return res.status(404).json({ message: 'Test suite not found' });
    }
    res.status(200).json({ suiteId: suite.id, results: suite.results });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { app, server };
