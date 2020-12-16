const {Translator}  = require('./TranslatorClass');

async function translateTest() {
    trans = new Translator()
    const qs = {
        'api-version': '3.0',
        'to': ['de', 'ja', 'en']
    }

    const body = [{
        'text': 'おはようございます'
    }]

    var result = await trans.translatorAPI(qs, body)
    console.dir(result[0]);
}

async function transliterateTest(){
    trans = new Translator()
    const qs = {
        'api-version': '3.0',
        'language': 'ja',
        "fromScript":"jpan",
        "toScript":"Latn"
    }

    const body = [
        {'text': 'おはようございます'},
        {'text': 'こんにちは'}
    ]

    var result = await trans.transliterateAPI(qs, body)
    console.dir(result);
}

async function detectTest(){
    trans = new Translator()
    const qs = {
        'api-version': '3.0'
    }

    const body = [
        {'text': 'おはようございます'},
        {'text': 'Hello'}
    ]

    var result = await trans.detectAPI(qs, body)
    console.dir(result);
}

async function breakSentenceTest(){
    trans = new Translator()
    const qs = {
        'api-version': '3.0'
    }

    const body = [    { "Text": "How are you? I am fine. What did you do today?" }]

    var result = await trans.breakSentenceAPI(qs, body)
    console.dir(result);
}

async function dictionaryTest(){
    trans = new Translator()
    const qs = {
        'api-version': '3.0',
        'from': 'en',
        'to': 'ja'
    }
    const body = [    { "Text": "Hello" }]

    var result = await trans.dictionaryAPI(qs, body)
    console.dir(result[0]);
}

async function dictionaryExampleTest(){
    trans = new Translator()
    const qs = {
        'api-version': '3.0',
        'from': 'en',
        'to': 'ja'
    }

    const body =[{
        'Text': 'fly', "Translation":"volar"
    }]

    var result = await trans.dictionaryExampleAPI(qs, body)
    console.dir(result);
}

// translateTest()
// transliterateTest()
// detectTest()
// breakSentenceTest()
// dictionaryTest()
dictionaryExampleTest()