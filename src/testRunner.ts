import { TestSuite } from './testSuite';
import { assertEquals } from './assertions';

const suite = new TestSuite();

suite.addTest('Example Test', () => {
    const result = 1 + 1;
    assertEquals(result, 2);
});

suite.run();
