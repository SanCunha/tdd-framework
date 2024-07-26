import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TestCase } from '../models/testCase';
import { TestSuite } from '../models/testSuite';
import { TestResult } from '../models/testResult';

const router = express.Router();

let testSuites: { [id: string]: TestSuite } = {};

// Create Test Suite
router.post('/test-suites', (req, res) => {
    const { name } = req.body;
    const newSuite = new TestSuite(name);
    const suiteId = uuidv4();
    testSuites[suiteId] = newSuite;
    res.status(201).json({ id: suiteId, name });
});

// Add Test Case to Suite
router.post('/test-suites/:suiteId/test-cases', (req, res) => {
    const { suiteId } = req.params;
    const { name, testCase } = req.body;
    console.log('Adding test case:', { suiteId, name, testCase });
    const suite = testSuites[suiteId];
    if (!suite) {
        console.error('Test suite not found:', suiteId);
        return res.status(404).json({ message: 'Test suite not found' });
    }
    try {
        const testMethod = new Function(testCase) as () => void;
        const newTestCase = new TestCase(name, testMethod);
        suite.add(newTestCase);
        const testCaseId = uuidv4();
        res.status(201).json({ id: testCaseId, name });
    } catch (error) {
        console.error('Error adding test case:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Run Test Suite
router.post('/test-suites/:suiteId/run', (req, res) => {
    const { suiteId } = req.params;
    const suite = testSuites[suiteId];
    if (!suite) {
        return res.status(404).json({ message: 'Test suite not found' });
    }
    const result = new TestResult();
    suite.run(result);
    res.status(200).json(result.summary());
});

// Get Test Suite Results
router.get('/test-suites/:suiteId/results', (req, res) => {
    const { suiteId } = req.params;
    const suite = testSuites[suiteId];
    if (!suite) {
        return res.status(404).json({ message: 'Test suite not found' });
    }
    const result = new TestResult();
    suite.run(result);
    res.status(200).json(result.summary());
});

export default router;
