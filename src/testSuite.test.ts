import { TestSuite } from './testSuite';
import { assertEquals } from './assertions';

test('TestSuite runs added test cases', () => {
    const suite = new TestSuite();
    let testRan = false;

    suite.addTest('Sample Test', () => {
        testRan = true;
    });

    suite.run();

    expect(testRan).toBe(true);
});

test('TestSuite reports test failures', () => {
    const suite = new TestSuite();
    let testFailed = false;

    suite.addTest('Failing Test', () => {
        try {
            assertEquals(1, 2);
        } catch {
            testFailed = true;
        }
    });

    suite.run();

    expect(testFailed).toBe(true);
});
