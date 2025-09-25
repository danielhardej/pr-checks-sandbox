/**
 * Simple application for testing PR checks
 */

function greet(name) {
    if (!name) {
        throw new Error('Name is required');
    }
    return `Hello, ${name}!`;
}

function calculate(a, b, operation = 'add') {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    
    if (isNaN(num1) || isNaN(num2)) {
        throw new Error('Invalid numbers provided');
    }
    
    switch (operation) {
    case 'add':
        return num1 + num2;
    case 'subtract':
        return num1 - num2;
    case 'multiply':
        return num1 * num2;
    case 'divide':
        if (num2 === 0) {
            throw new Error('Division by zero is not allowed');
        }
        return num1 / num2;
    default:
        throw new Error('Unsupported operation');
    }
}

// Main execution
if (require.main === module) {
    console.log('PR Checks Sandbox - Test Application');
    console.log(greet('World'));
    console.log('2 + 3 =', calculate(2, 3));
}

module.exports = { greet, calculate };