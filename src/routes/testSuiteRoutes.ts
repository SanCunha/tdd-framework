import express from 'express';
import { addTestCase, createTestSuite, getTestSuiteResults, runTestSuite } from '../controllers/testSuiteController';

const router = express.Router();


router.post('/test-suites',createTestSuite);
router.post('/test-suites/:suiteId/test-cases', addTestCase);
router.post('/test-suites/:suiteId/run',runTestSuite);
router.get('/test-suites/:suiteId/results', getTestSuiteResults);

export default router;
