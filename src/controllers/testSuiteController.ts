import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TestSuite} from '../models/testSuite';
import { TestCaseType } from '../types/testCase';
import { TestCase } from '../models/testCase';
import { TestResult } from '../models/testResult';


let testSuites: { [id: string]: TestSuite } = {};

export const createTestSuite =  (req: Request, res: Response) => {
    const { name } = req.body;
    const newSuite = new TestSuite(name);
    const suiteId = uuidv4();
    testSuites[suiteId] = newSuite;
    res.status(201).json({ id: suiteId, name });
};

export const addTestCase = (req: Request, res: Response) => {
    const { suiteId } = req.params;
    const { name, testCase } = req.body;
    console.log('Adding test case:', { suiteId, name, testCase });
    const suite = testSuites[suiteId];
    if (!suite) {
        console.error('Test suite not found:', suiteId);
        return res.status(404).json({ message: 'Test suite not found' });
    }
    try {
        const testMethod = new Function(testCase) as TestCaseType;
        const newTestCase = new TestCase(name, testMethod);
        suite.add(newTestCase);
        const testCaseId = uuidv4();
        res.status(201).json({ id: testCaseId, name });
    } catch (error) {
        console.error('Error adding test case:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const runTestSuite = (req: Request, res: Response) => {
    const { suiteId } = req.params;
    const suite = testSuites[suiteId];
    if (!suite) {
        return res.status(404).json({ message: 'Test suite not found' });
    }
    const result = new TestResult();
    suite.run(result);
    res.status(200).json(result.summary());
};

export const getTestSuiteResults = (req: Request, res: Response) => {
    const { suiteId } = req.params;
    const suite = testSuites[suiteId];
    if (!suite) {
        return res.status(404).json({ message: 'Test suite not found' });
    }
    const result = new TestResult();
    suite.run(result);
    res.status(200).json(result.summary());
};
