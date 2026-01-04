import '@testing-library/jest-dom/vitest';
import { beforeAll, afterAll } from 'vitest';

const originalConsoleError = console.error;

beforeAll(() => {
    console.error = (...args: unknown[]) => {
        originalConsoleError(...args);
        throw new Error('Test failed: console.error was called.');
    };
});

afterAll(() => {
    console.error = originalConsoleError;
});