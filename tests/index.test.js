const { greet, calculate } = require('../src/index');

describe('greet function', () => {
    test('should return greeting message', () => {
        expect(greet('World')).toBe('Hello, World!');
    });

    test('should throw error for empty name', () => {
        expect(() => greet()).toThrow('Name is required');
        expect(() => greet('')).toThrow('Name is required');
    });
});

describe('calculate function', () => {
    test('should add two numbers', () => {
        expect(calculate(2, 3)).toBe(5);
        expect(calculate(0, 0)).toBe(0);
        expect(calculate(-1, 1)).toBe(0);
    });

    test('should subtract two numbers', () => {
        expect(calculate(5, 3, 'subtract')).toBe(2);
        expect(calculate(0, 1, 'subtract')).toBe(-1);
    });

    test('should multiply two numbers', () => {
        expect(calculate(3, 4, 'multiply')).toBe(12);
        expect(calculate(0, 5, 'multiply')).toBe(0);
    });

    test('should divide two numbers', () => {
        expect(calculate(10, 2, 'divide')).toBe(5);
        expect(calculate(7, 2, 'divide')).toBe(3.5);
    });

    test('should throw error for division by zero', () => {
        expect(() => calculate(5, 0, 'divide')).toThrow('Division by zero is not allowed');
    });

    test('should throw error for invalid numbers', () => {
        expect(() => calculate('abc', 2)).toThrow('Invalid numbers provided');
        expect(() => calculate(2, 'def')).toThrow('Invalid numbers provided');
    });

    test('should throw error for unsupported operation', () => {
        expect(() => calculate(2, 3, 'power')).toThrow('Unsupported operation');
    });
});