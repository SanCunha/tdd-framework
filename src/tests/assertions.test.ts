import { assertEquals } from '../controllers/assertions';

test('assertEquals passes for equal values', () => {
    expect(() => assertEquals(1, 1)).not.toThrow();
});

test('assertEquals throws for unequal values', () => {
    expect(() => assertEquals(1, 2)).toThrow('Assertion Failed: expected 2, but got 1');
});
