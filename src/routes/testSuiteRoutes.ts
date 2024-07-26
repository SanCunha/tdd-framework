import { Router } from 'express';
import { createTestSuite, addTestCase, runTestSuite, getTestSuiteResults } from '../controllers/testSuiteController';

const router = Router();

router.post('/test-suites', createTestSuite);
router.post('/test-suites/:suiteId/test-cases', addTestCase);
router.post('/test-suites/:suiteId/run', runTestSuite);
router.get('/test-suites/:suiteId/results', getTestSuiteResults);

export default router;
