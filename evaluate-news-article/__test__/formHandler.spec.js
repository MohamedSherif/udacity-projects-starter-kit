// to solve ReferenceError: regeneratorRuntime is not defined
// https://knowledge.udacity.com/questions/174638
import 'babel-polyfill'
import 'isomorphic-fetch'

const post = require('../src/client/js/formHandler').post
const handleSubmit = require('../src/client/js/formHandler').handleSubmit

describe('Client Test', () => {
    // TODO: add your test cases to test client
    test('the data is BBC Home Page', async() => {
        const res = await post('http://localhost:8085/add-url', {_url : 'https://www.bbc.com/news/world-latin-america-56342303'});
        // console.log(res);
           
        var output = { text: 'BBC Homepage',
            score_tag: 'NEU',
            agreement: 'DISAGREEMENT',
            subjectivity: 'SUBJECTIVE',
            confidence: '86',
            irony: 'NONIRONIC' 
        };

        expect(res).toMatchObject(output);
      });
})

describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
           expect(handleSubmit).toBeDefined();
    });
});
