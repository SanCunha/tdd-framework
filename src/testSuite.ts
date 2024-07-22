type TestCase = () => void;

export class TestSuite {
    private tests: { name: string, testCase: TestCase }[] = [];

    addTest(name: string, testCase: TestCase) {
        this.tests.push({ name, testCase });
    }

    run() {
        this.tests.forEach(({ name, testCase }) => {
            try {
                testCase();
                console.log(`✓ ${name}`);
            } catch (error) {
                console.error(`✗ ${name}`);
                console.error(error);
            }
        });
    }
}
