// Environment variables Configuration 
const dotenv = require('dotenv');
dotenv.config();
// console.log(`Your API key is ${process.env.API_KEY}`);

const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')

const https = require('follow-redirects').https;
const fs = require('fs');

const PORT = 8085

// Create an instance for the server
const app = express()
// Configure cors to avoid cors-origin issue
app.use(cors())

// Configure express to use body-parser as middle-ware.
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

// Configure express static directory.
app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    console.log(req);
    res.sendFile(path.resolve('src/client/views/index.html'))
})
// INFO: a route that handling post request for new URL that coming from the frontend
app.post('/add-url', async (req, res) => {
    console.log(req.body);
    try {
        var url = req.body._url;
        var options = {
            'method': 'POST',
            'hostname': 'api.meaningcloud.com',
            'path': '/sentiment-2.1?key=' + process.env.API_KEY + '&lang=en&url=' + url,
            'headers': {
            },
            'maxRedirects': 20
        };

        var req = https.request(options, function (response) {
            var chunks = [];

            response.on("data", function (chunk) {
                chunks.push(chunk);
            });

            response.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                console.log('end');
                // console.log(body.toString());
                console.log(typeof(body));

                var jsonBody = JSON.parse(body.toString());

                var apiResponse = {
                    text: (jsonBody.sentence_list != null && jsonBody.sentence_list != undefined && jsonBody.sentence_list.length > 0)? jsonBody.sentence_list[0].text : '',
                    score_tag : jsonBody.score_tag,
                    agreement : jsonBody.agreement,
                    subjectivity : jsonBody.subjectivity,
                    confidence : jsonBody.confidence,
                    irony : jsonBody.irony
                };
                
                console.log(apiResponse);
                res.send(apiResponse);
            });

            response.on("error", function (error) {
                console.log('Error');
                console.log(body.toString());
                console.error(error);
            });
        });

        req.end();
    } catch (error) {
        console.log(error.message)
    }
})

app.get('/test', function (req, res) {
    console.log(req);
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})

// Export app to use it in the unit testing
