# What is this
Azure Translator API を試してみる

Translator とは

https://docs.microsoft.com/ja-jp/azure/cognitive-services/translator/translator-info-overview

node.js のクイックスタート

https://docs.microsoft.com/ja-jp/azure/cognitive-services/translator/quickstart-translate?pivots=programming-language-javascript

# API reference
これを順々に試していくための sample

https://docs.microsoft.com/ja-jp/azure/cognitive-services/translator/reference/v3-0-reference



# やってみた
## 全般の諸注意
### 試し方
.env に下の 2　つを入力して

- TRANSLATOR_TEXT_SUBSCRIPTION_KEY   :Translator のリソースのキー
- TRANSLATOR_TEXT_SUBSCRIPTION_REGION:どこに立てたリソースか

普通に node で実行

```
node .\test.js
```
リソースのエンドポイントとかもあるけど、なんか使わなくても動いてる



### 使用する Translator リソースの種類ごとの認証
これがなんかややこしい。とりあえずは`リージョンリソース`を使用してみてるっぽい（自信はない）

- グローバルリソース
    - Ocp-Apim-Subscription-Key
- リージョンリソース
    - Ocp-Apim-Subscription-Key
    - Ocp-Apim-Subscription-Region
- cognitive service マルチサービスリソース
    - Ocp-Apim-Subscription-Key
    - Ocp-Apim-Subscription-Region

これに加えて、どのリージョンでも使えるアクセストークンの方法もある
秘密鍵をトークンと交換するらしい。余計な処理増やすのも面倒だし、とりあえず今はスルーします。


## Languages
もろもろの API で対応している言語のリストを取得する
GET リクエストでとれて、特に何かが必要なわけではなさげ

## Translate
翻訳機能。


入力
```json
{
    "method": 'POST',
    "baseUrl": endpoint,
    "url": 'translate',
    "qs": {
        'api-version': '3.0',
        'to': ['de', 'ja','en']
    },
    "headers": {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region':region,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
    },
    "body": [{
        'text': 'おはようございます'
    }],
    "json": true,
}
            
```
出力
```json
[
    {
        "detectedLanguage": {
            "language": "ja",
            "score": 1
        },
        "translations": [
            {
                "text": "Guten Morgen",
                "to": "de"
            },
            {
                "text": "おはようございます",
                "to": "ja"
            },
            {
                "text": "Good morning",
                "to": "en"
            }
        ]
    }
]
```

## Transliterate
ローマ字おこし等の他の言語での文字起こしが可能。


入力
```json
{
    "method": 'POST',
    "baseUrl": endpoint,
    "url": 'transliterate',
    "qs": {
        'api-version': '3.0',
        'language': 'ja',
        "fromScript":"jpan",
        "toScript":"Latn"
    },
    "headers": {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region':region,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
    },
    "body": [
        {"Text":"こんにちは"},
        {"Text":"さようなら"}
    ],
    "json": true,
};
            
```
出力
```json
[
    {
        "language": "ja",
        "score": 1,
        "isTranslationSupported": true,
        "isTransliterationSupported": true
    }
]
```

## Detect
テキストの言語が日本語などの何語に相当するかを検出。

入力
```json
{
    "method": 'POST',
    "baseUrl": endpoint,
    "url": 'translate',
    "qs": {
        'api-version': '3.0'
    },
    "headers": {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region':region,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
    },
    "body": [{
        'text': 'おはよう'
    }],
    "json": true,
};
            
```
出力
```json
[
    {
        "language": "ja",
        "score": 1,
        "isTranslationSupported": true,
        "isTransliterationSupported": true
    }
]
```


## BreakSentence
文の切れ目の位置を検出する。

入力
```json
{
    "method": 'POST',
    "baseUrl": endpoint,
    "url": 'translate',
    "qs": {
        'api-version': '3.0'
    },
    "headers": {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region':region,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
    },
    "body": [    { "Text": "How are you? I am fine. What did you do today?" }],
    "json": true,
}       
```
出力
```json
[
  {
    "detectedLanguage": { "language": 'en', "score": 1 },
    "sentLen": [ 13, 11, 22 ]
  }
]
```


## Dictionary
辞書検索。

入力
```json
{
    "method": 'POST',
    "baseUrl": endpoint,
    "url": 'translate',
    "qs": {
        'api-version': '3.0',
        'from': 'en',
        'to': 'ja'
    },
    "headers": {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region':region,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
    },
    "body": [{
        'Text': 'Hello'
    }],
    "json": true,
}  
```
出力
```json
{
  "normalizedSource": 'hello',
  "displaySource": 'Hello',
  "translations": [
    {
      "normalizedTarget": 'こんにちは',
      "displayTarget": 'こんにちは',
      "posTag": 'NOUN',
      "confidence": 0.401,
      "prefixWord": '',
      "backTranslations": [Array]
    },
    {
      "normalizedTarget": 'こんにち',
      "displayTarget": 'こんにち',
      "posTag": 'NOUN',
      "confidence": 0.2792,
      "prefixWord": '',
      "backTranslations": [Array]
    },
    {
      "normalizedTarget": 'ハロー',
      "displayTarget": 'ハロー',
      "posTag": 'NOUN',
      "confidence": 0.2118,
      "prefixWord": '',
      "backTranslations": [Array]
    },
    {
      "normalizedTarget": 'もしもし',
      "displayTarget": 'もしもし',
      "posTag": 'NOUN',
      "confidence": 0.1081,
      "prefixWord": '',
      "backTranslations": [Array]
    }
  ]
}
```





## Dictionary-example


入力
```json
{
    "method": 'POST',
    "baseUrl": endpoint,
    "url": 'translate',
    "qs": {
        'api-version': '3.0',
        'from': 'en',
        'to': 'ja'
    },
    "headers": {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region':region,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
    },
    "body": [{
        'Text': 'fly', "Translation":"volar"
    }],
    "json": true,
}    
```
出力
```json
[
    {
        "normalizedSource": "fly",
        "normalizedTarget": "volar",
        "examples": []
    }
]
```