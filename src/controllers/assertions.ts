export function assertEquals(actual: any, expected: any) {
    if (actual !== expected) {
        throw new Error(`Assertion Failed: expected ${expected}, but got ${actual}`);
    }
}
