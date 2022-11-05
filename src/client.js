

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
          } else {
            document.getElementById('verUTD').innerHTML = '(not up to date - latest: ' + obj + ')'
          }
        })
    }
  }
}

console.log(appConfig.clientID, appConfig.version)
var version = new upUtil()
version.getLatestStableReleaseFrom(
  'https://api.greenworldia.repl.co/api/v1/version/'
)
