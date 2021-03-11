// Import the url validation function
const validateUrl = require('../src/client/js/checkURL').default

describe('Test check url functionality', () => {
    test('Testing the checkUrl function defined or not', () => {
        expect(validateUrl).toBeDefined();
    })

    test('Testing the checkUrl function return false for invalid url', () => {
        expect(validateUrl('sdsfsdfsdf')).toEqual(false);
    })

    test('Testing the checkUrl function return true for valid url', () => {
        expect(validateUrl('www.google.com')).toEqual(true);
    })
})
