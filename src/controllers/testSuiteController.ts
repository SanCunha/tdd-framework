import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TestFixture } from '../tests/xunit/TestFixture';
import { TestCase } from '../tests/xunit/TestCase';
import { TestRunner } from '../tests/xunit/TestRunner';

const testSuites: Record<string, TestFixture> = {};

export const createTestSuite = (req: Request, res: Response) => {
    const { name } = req.body;
    const newSuite = new TestFixture(name, []);
    const id = uuidv4();
    testSuites[id] = newSuite;
    res.status(201).json({ id, name });
};

export const addTestCase = (req: Request, res: Response) => {
    const { suiteId } = req.params;
    const { name, testCase } = req.body;
    const suite = testSuites[suiteId];
    if (!suite) {
        return res.status(404).json({ message: 'Test suite not found' });
    }
    const newTestCase: TestCase = { name, execute: new Function(testCase) as () => void };
    suite.addTestCase(newTestCase);
    res.status(201).json({ name });
};

export const runTestSuite = (req: Request, res: Response) => {
    const { suiteId } = req.params;
    const suite = testSuites[suiteId];
    if (!suite) {
        return res.status(404).json({ message: 'Test suite not found' });
    }
    const runner = new TestRunner();
    const results = runner.run(suite);
    res.status(200).json({ suiteId, results });
};

export const getTestSuiteResults = (req: Request, res: Response) => {
    const { suiteId } = req.params;
    const suite = testSuites[suiteId];
    if (!suite) {
        return res.status(404).json({ message: 'Test suite not found' });
    }
    const runner = new TestRunner();
    const results = runner.run(suite);
    res.status(200).json({ suiteId, results });
};
