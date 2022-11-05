const connected = document.querySelector('.connected');
const serverConnect = document.querySelectorAll('.serverConnect');
const settingsIcon = document.getElementById('settingsIco');
const settingsPanel = document.querySelector('.settingsPanelC');
const settingsClose = document.querySelector('.settingsClose');
const header = document.querySelector("header.window-drag"); 

settingsIcon.addEventListener("click", (e) => {
    settingsPanel.classList.toggle("show");
    if(settingsPanel.classList.contains("show")) {
        header.style.borderRadius = "0";
    } else if(!settingsPanel.classList.contains("show")) {
        header.style.borderRadius = "0px 0px 8px 8px";
    }
});
settingsClose.addEventListener("click", (e) => {
    settingsPanel.classList.toggle("show");
    if(!settingsPanel.classList.contains("show")) {
        header.style.borderRadius = "0px 0px 8px 8px";
    }
  });