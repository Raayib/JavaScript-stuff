let sourceLang = 'auto';
let firstTargetLang = 'ar';
let secondTargetLang = 'en';
let baseLang = firstTargetLang;
let text;
let translatedText;
let url;
let autoBaseLang;
let vUrl;
let vLang;
let showTargetLang = firstTargetLang;




// get clean text
function textToTranslator() {
    let textToTrans = document.getElementById('textToTrans');
    text = textToTrans.value;
    text = text.replace(/\n\r?/g, ' '); // replace line with specs
    text = encodeURI(text);
}

// fetch to the text and translate it
async function data(url, baseLang) {

    textToTranslator()
    url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
        + sourceLang + "&tl=" + baseLang + "&dt=t&q=" + text;
    const response = await fetch(url);
    return response.json()
}

// check the language and second language handler
function translator() {

    data(url, baseLang)
        .then(data => {
            translatedText = data[0][0][0];
            autoBaseLang = data[2];

        })
        .then(() => {
        if (autoBaseLang === firstTargetLang) {
            showTargetLang = secondTargetLang;
            data(url, secondTargetLang)
                .then(zdata => {
                    translatedText = zdata[0][0][0];
                    autoBaseLang = zdata[2];
                    showTranslatedText(autoBaseLang, translatedText);
                });
        } else {
            showTranslatedText(autoBaseLang, translatedText);
            showTargetLang = firstTargetLang;
        }

    })
    .catch(error => {
        showTranslatedText('error', error)
    });
}



// the result
function showTranslatedText(autoBaseLang, translatedText) {
    let translatedTextId = document.getElementById('translatedTextId');
    translatedTextId.value = translatedText;

    let textToTransLabel = document.getElementById('textToTransLabel');
    textToTransLabel.value = autoBaseLang;

    let translatedTextLabel = document.getElementById('translatedTextLabel');
    translatedTextLabel.value = showTargetLang;


}

//tss url
function ttsUrl(vLang = secondTargetLang, vText) {

    textToTranslator();

    vUrl = "https://translate.google.com/translate_tts?ie=UTF-8&q="
        + vText + "&tl=" + vLang + "&client=gtx";
}

// tss for the text want to translate
function ttsFirst() {

    let vText = document.getElementById('textToTrans');
    vText = vText.value;
    vText = encodeURI(vText)

    ttsUrl(autoBaseLang, vText)
    document.getElementById('v-lang-audio-first').innerHTML = `<audio id="v-lang-audio" controls="controls" autoplay="autoplay" src="${vUrl}">`;
}

// tss for the translated text
function ttsSecond() {

    let vText = document.getElementById('translatedTextId');
    vText = vText.value;
    vText = encodeURI(vText)

    ttsUrl(showTargetLang, vText)
    document.getElementById('v-lang-audio-second').innerHTML = `<audio id="v-lang-audio" controls="controls" autoplay="autoplay" src="${vUrl}">`;
}