const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const selectTag = document.querySelectorAll("select");
const icons = document.querySelectorAll(".row i");
const translateBtn = document.querySelector("button");


// Adding countries with country code to select tags
selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = 
          id == 0 
        ? country_code == "en-GB" ? "selected" : "" 
        : country_code == "de-DE" ? "selected" : "";

        // selected attribute is a boolean attribule, when present, it specifies that an option should be pre-selected when the page loads.
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

// Function to change countries when exchanged icon clicked
exchangeIcon.addEventListener("click", ()=> {
  let tempText = fromText.value;
  fromText.value = toText.value;
  toText.value = tempText;
  let tempLang = selectTag[0].value;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempLang;
});


fromText.addEventListener("keyup", ()=>{
  if(!fromText.value){
    toText.value="";
  }
});

translateBtn.addEventListener("click", ()=>{
  // js declaring multiple variables syntax
  let text = fromText.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
  if(!text) return; // do nothing when input is empty
  toText.setAttribute("placeholder", "Translating...");
  // Adding Api
  let APIURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(APIURL)
  .then(response => response.json())
  .then(response => {
    console.log(response);
    toText.value = response.responseData.translatedText;
  });
  
});

icons.forEach(icon =>{
    icon.addEventListener("click", ({target})=>{
        if(!fromText.value || !toText.value) return;
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value)
            }
        } else {
            let utterance;
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    })
})




