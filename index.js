const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchageIcon = document.querySelector(".exchange");
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


