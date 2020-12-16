const request = require('request');
const uuidv4 = require('uuid/v4');
const path = require('path');

// Read environment variables from .env file
const ENV_FILE = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_FILE });

var key_var = 'TRANSLATOR_TEXT_SUBSCRIPTION_KEY';
if (!process.env[key_var]) {
    throw new Error('Please set/export the following environment variable: ' + key_var);
}
var subscriptionKey = process.env[key_var];

var region_var = 'TRANSLATOR_TEXT_SUBSCRIPTION_REGION';
if (!process.env[region_var]) {
    throw new Error('Please set/export the following environment variable: ' + region_var);
}
var region = process.env[region_var];

var endpoint_var = 'TRANSLATOR_TEXT_ENDPOINT';
if (!process.env[endpoint_var]) {
    throw new Error('Please set/export the following environment variable: ' + endpoint_var);
}

let options = {
    "method": 'POST',
    "baseUrl": "",
    "url": "test",
    "qs": {},
    "headers": {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': region,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
    },
    "body": [],
    "json": true,
};

class Translator {

    constructor() {}

    async sendRequest(options){
        return new Promise(function (resolve, reject) {
            request(options, function (err, res, body) {
                if (err) {
                    console.log('Error: ' + err.message);
                    reject("request error")
                } else {
                    // console.log(body);
                    resolve(JSON.parse(JSON.stringify(body)))
                }
            });
        });
    }

    async translatorAPI(_qs, _body) {
        options.qs = _qs;options.body = _body;
        options.baseUrl = process.env[endpoint_var] + 'translate?api-version=3.0&to=es';
        return await this.sendRequest(options);
    }

    async transliterateAPI(_qs, _body) {
        options.qs = _qs;options.body = _body;
        options.baseUrl  = process.env[endpoint_var]+'transliterate?api-version=3.0';
        return await this.sendRequest(options);
    }

    async detectAPI(_qs, _body) {
        options.qs = _qs;options.body = _body;
        options.baseUrl  = process.env[endpoint_var]+'detect?api-version=3.0&to=es';
        return await this.sendRequest(options);
    }

    async breakSentenceAPI(_qs, _body) {
        options.qs = _qs;options.body = _body;
        options.baseUrl  = process.env[endpoint_var]+'breaksentence?api-version=3.0';
        return await this.sendRequest(options);
    }

    async dictionaryAPI(_qs, _body) {
        options.qs = _qs;options.body = _body;
        options.baseUrl  = process.env[endpoint_var]+'dictionary/lookup?api-version=3.0';
        return await this.sendRequest(options);
    }

    async dictionaryExampleAPI(_qs, _body) {
        options.qs = _qs;options.body = _body;
        options.baseUrl  = process.env[endpoint_var]+'dictionary/examples?api-version=3.0';
        return await this.sendRequest(options);
    }
}

module.exports.Translator = Translator;