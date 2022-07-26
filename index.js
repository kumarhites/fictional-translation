const options = document.getElementsByName("language-selector");
const input = document.querySelector('#translate-input');
const output = document.querySelector("#translate-output");
const translateBtn = document.querySelector("#btn");
const errorMsg = document.querySelector(".error");



const baseUrl = "https://api.funtranslations.com/translate/";


async function translate(){
    const inputText = input.value;
    if(inputText.length <= 0){
        errorMsg.innerHTML = "Please enter something to translate!"
    }
    else if(inputText.length >= 1){
            errorMsg.innerHTML="";
            output.innerHTML = `<p>Translating....</p>`;     
    }
    const languageOptions  = Array.from(options).find((option) => option.checked);
    const language = languageOptions.value;

    const url = encodeURI(`${baseUrl}${language}.json?text=${inputText}`);
    try{
        const res = await fetch(url);
        const data = await res.json();
        if(res.status === 429){
            throw new Error(data.error.message)
        }
        const outputText = data.contents.translated;
        output.textContent = outputText; 
    }
    catch(err){
        output.innerHTML = `<p>${err}</p>`;
    }
}
translateBtn.addEventListener('click', translate);
