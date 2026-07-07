document.getElementById("sourceLang").addEventListener("change", (e) => {
    chrome.storage.local.set({ sourceLang: e.target.value });
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "changeSourceLang", sourceLang: e.target.value});
    });
});

document.getElementById("targetLang").addEventListener("change", (e) => {
    chrome.storage.local.set({ targetLang: e.target.value });
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "changeTargetLang", targetLang: e.target.value});
    });
});

document.addEventListener("DOMContentLoaded", ()=>{
    chrome.storage.local.get("sourceLang", (result) =>{
        if (result.sourceLang){
            document.getElementById("sourceLang").value = result.sourceLang;
        }
    })
    chrome.storage.local.get("targetLang", (result) =>{
        if (result.targetLang){
            document.getElementById("targetLang").value = result.targetLang;
        }
    })
})