const selectionPopup = document.createElement("img");
selectionPopup.src = chrome.runtime.getURL("images/icon-32.png");
selectionPopup.style.position = "absolute";
selectionPopup.style.zIndex = "999999";
selectionPopup.style.cursor = "pointer";
selectionPopup.style.height = "24px";
selectionPopup.style.width = "24px";
selectionPopup.style.display = "none";
document.body.appendChild(selectionPopup);

document.addEventListener("mouseup", (e) => {
    const textSelected = window.getSelection().toString().trim();
    console.log(textSelected);

    if (textSelected.length > 0){
        selectionPopup.style.left = `${e.pageX + 10}px`;
        selectionPopup.style.top = `${e.pageY + 10}px`;
        selectionPopup.style.display = "block";
    }else{
        selectionPopup.style.display = "none";
    }
})