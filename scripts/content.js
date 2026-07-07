async function myMemoTranslate(text, sourceLang, targetLang) {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`);
    const data = await res.json();
    return data.responseData.translatedText;
}

const selectionPopup = document.createElement("img");
selectionPopup.src = chrome.runtime.getURL("images/icon-32.png");
selectionPopup.style.position = "absolute";
selectionPopup.style.zIndex = "999999";
selectionPopup.style.cursor = "pointer";
selectionPopup.style.height = "32px";
selectionPopup.style.width = "32px";
selectionPopup.style.display = "none";
document.body.appendChild(selectionPopup);

let lastSelectedText = "";
let sourceLang = "en";
let targetLang = "zh-CN"

const translationPopup = document.createElement("div");
translationPopup.style.position = "absolute";
translationPopup .style.zIndex = "999999";
translationPopup.style.maxHeight = "200px";
translationPopup.style.overflowY = "auto";
translationPopup.style.width = "150px";
translationPopup.style.border = "1px solid"
translationPopup.style.backgroundColor = "white"
translationPopup.style.display = "none";
document.body.appendChild(translationPopup);

chrome.runtime.onMessage.addListener((message) => {
  if (message.action == "changeSourceLang") sourceLang = message.sourceLang;
  if(message.action == "changeTargetLang") targetLang = message.targetLang;
});

document.addEventListener("mouseup", (e) => {
    const textSelected = window.getSelection().toString().trim();
    lastSelectedText = textSelected;
    console.log(textSelected);

    if (textSelected.length > 0){
        selectionPopup.style.left = `${e.pageX + 10}px`;
        selectionPopup.style.top = `${e.pageY + 10}px`;
        selectionPopup.style.display = "block";
    }else{
        selectionPopup.style.display = "none";
    }
})

selectionPopup.addEventListener("click", async (e) => {
    selectionPopup.style.display = "none";
    translationPopup.style.left = `${e.pageX + 10}px`;
    translationPopup.style.top = `${e.pageY + 10}px`;

    chrome.storage.local.get("sourceLang", (result) =>{
        if (result.sourceLang) sourceLang = result.sourceLang;
    });
    chrome.storage.local.get("targetLang", (result) =>{
        if (result.targetLang) targetLang = result.targetLang;
    })
    const result = await myMemoTranslate(lastSelectedText, sourceLang, targetLang);
    translationPopup.textContent = result;
    translationPopup.style.display = "block";
})

document.addEventListener("mousedown", (e) => {
    const rect = translationPopup.getBoundingClientRect();
    if (!(
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom)
    ){
        translationPopup.style.display = "none";
    }
})


