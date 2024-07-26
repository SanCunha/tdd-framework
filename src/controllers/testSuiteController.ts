import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TestSuite, TestCase } from '../models/testSuite';
import { TestSuiteService } from '../services/testSuiteService';

const testSuiteService = new TestSuiteService();

export const createTestSuite = (req: Request, res: Response) => {
    const { name } = req.body;
    const newSuite: TestSuite = { id: uuidv4(), name, testCases: [], results: [] };
    testSuiteService.addTestSuite(newSuite);
    res.status(201).json(newSuite);
};

export const addTestCase = (req: Request, res: Response) => {
    const { suiteId } = req.params;
    const { name, testCase } = req.body;
    try {
        const newTestCase = testSuiteService.addTestCaseToSuite(suiteId, name, new Function(testCase) as TestCase);
        res.status(201).json(newTestCase);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const runTestSuite = (req: Request, res: Response) => {
    const { suiteId } = req.params;
    try {
        const results = testSuiteService.runTestSuite(suiteId);
        res.status(200).json({ suiteId, results });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const getTestSuiteResults = (req: Request, res: Response) => {
    const { suiteId } = req.params;
    try {
        const results = testSuiteService.getTestSuiteResults(suiteId);
        res.status(200).json({ suiteId, results });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
