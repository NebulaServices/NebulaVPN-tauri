
const connected = document.querySelector('.connected')
const serverConnect = document.querySelectorAll('.serverConnect')
const settingsIcon = document.getElementById('settingsIco')
const settingsPanel = document.querySelector('.settingsPanelC')
const settingsClose = document.querySelector('.settingsClose')
const header = document.querySelector('header.window-drag')
class upUtil {
  constructor (r) {
    var _clientVersion = appConfig.version
    this.sender = function (_data) {}
    this.getLatestStableReleaseFrom = async function (_url) {
      let obj
      fetch(_url)
        .then(res => res.json())
        .then(data => {
          obj = data
        })
        .then(() => {
          console.log(obj)
          if (obj === _clientVersion) {
            document.getElementById('verUTD').innerHTML = '(Up to date)'
            document.getElementById('version').innerHTML = obj

          } else {
            document.getElementById('verUTD').innerHTML = '(not up to date - latest: ' + obj + ')'
          }
        })
    }
  }
}
var version = new upUtil()
version.getLatestStableReleaseFrom(
  'https://api.greenworldia.repl.co/api/v1/version/'
)


settingsIcon.addEventListener('click', e => {
  settingsPanel.classList.toggle('show')
  if (settingsPanel.classList.contains('show')) {
    header.style.borderRadius = '0'
  } else if (!settingsPanel.classList.contains('show')) {
    header.style.borderRadius = '0px 0px 8px 8px'
  }
})
settingsClose.addEventListener('click', e => {
  settingsPanel.classList.toggle('show')
  version.getLatestStableReleaseFrom(
    'https://api.greenworldia.repl.co/api/v1/version/'
  )

  if (!settingsPanel.classList.contains('show')) {
    header.style.borderRadius = '0px 0px 8px 8px'
  }
})
