const { appWindow } = window.__TAURI__.window

await appWindow.center();
// Window controls 
document.querySelector('.winBtnClose').addEventListener('click', () => {
  appWindow.close()
})
document.querySelector('.winBtnMax').addEventListener("click", () => {
  appWindow.toggleMaximize()
})
document.querySelector('.winBtnMin').addEventListener("click", () => {
  appWindow.minimize()
})

let userID = "wearr"

async function updateUserID() {
    document.getElementById("userID").textContent = userID
}
updateUserID();
