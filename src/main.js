const { appWindow } = window.__TAURI__.window
const invoke = window.__TAURI__.invoke

// testing rust connectivity!
invoke('hello_world')





appWindow.center();

document.querySelector('.winBtnClose').addEventListener('click', () => {
  appWindow.close()
});

document.querySelector('.winBtnMax').addEventListener("click", () => {
  appWindow.toggleMaximize()
});

document.querySelector('.winBtnMin').addEventListener("click", () => {
  appWindow.minimize()
});

const connected = document.querySelector('.connected');
const serverConnect = document.querySelectorAll('.serverConnect');
const settingsIcon = document.querySelector('.settings');
const settingsPanel = document.querySelector('.settingsPanelC');
const settingsClose = document.querySelector('.settingsClose');
const header = document.querySelector("header.window-drag");

document.body.oncontextmenu = function (e) {
  return false
}

const contextMenu = document.createElement("div");
contextMenu.classList.add("contextMenu");

header.addEventListener("mousedown", (e) => {
  if(e.button === 0) {
    if(contextMenu) {
      contextMenu.remove();
    }
  }
  if(e.button === 2) {
    contextMenu.innerHTML = `
      <ul class="contextList">
        <li class="contextItem mini">About</li>
      </ul>
    `;
    const closeWindow = contextMenu.querySelector(".windowClose");
    closeWindow.addEventListener("click", () => {
      appWindow.close();
    });
    const minimizeWindow = contextMenu.querySelector(".mini");
    minimizeWindow.addEventListener("click", () => {
      appWindow.minimize();
      contextMenu.remove();
    });
    const maximizeWindow = contextMenu.querySelector(".maxi");
    maximizeWindow.addEventListener("click", () => {
      appWindow.toggleMaximize();
      contextMenu.remove();
    })
    contextMenu.style.left = e.clientX + "px";
    contextMenu.style.top = e.clientY + "px";
    document.body.appendChild(contextMenu);
  }
  document.addEventListener("click", (e) => {
    if(e.target !== contextMenu) {
      contextMenu.remove();
    }
  })
})

connected.addEventListener("mouseover", function() {
    connected.innerHTML = "DISCONNECT";
    connected.style.backgroundColor = "#f97474";
    connected.style.color = "#ffffff";
    connected.onmouseout = () => {
        connected.style.backgroundColor = "#9FFF8F";
        connected.style.color = "#4F9E42";
        connected.innerHTML = "CONNECTED";
    };
});



